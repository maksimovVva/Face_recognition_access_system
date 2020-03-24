import cv2
import os
import glob
import numpy as np
import tensorflow as tf
import face_recognition
import datetime
import time
import copy
import json
import pika

from object_detection.utils import label_map_util

from object_detection.utils import visualization_utils as vis_util

# Parameters for body detection
MODEL_NAME = 'body_detection_model'
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'
PATH_TO_LABELS = os.path.join('object_detection', 'data', 'mscoco_label_map.pbtxt')
NUM_CLASSES = 1

# Parameters for current camera
CAMERA_ID = 0
DECREASING_LEVEL = 2

# Parameters for connection with server
USER = 'faceControl'
PASSWORD = 'FaCeCoNtRoL'
IP = '172.20.10.3'
PORT = 5672

# Visualization parameters
RED_COLOR = (0, 0, 255)
BLUE_COLOR = (255, 0, 0)
WHITE_COLOR = (245, 245, 245)
TEXT_FONT = cv2.FONT_HERSHEY_DUPLEX

# Timeouts for logging
TIMEOUT = 3           # sec for catching faces
TIMEOUT_UPDATE = 600  # sec for update known faces
WAIT_FOR_ALARM = 3    # sec for doesn't send message of alarm

TIME_TO_UPDATE = 1    # day for full cleanup face's base

DATASET_FOLDER = 'dataset'


def read_face_encoding(file_name):
    """
    Load photo and get encoding of face

    @parameter file_name: path to the photo
    @type file_name: C{string}

    """
    if not os.path.isfile(file_name):
        raise Exception("\n\nERROR: file \'" + file_name + "\' doesn't exist\n\n")

    image = face_recognition.load_image_file(file_name)
    face_encoding = face_recognition.face_encodings(image)

    if len(face_encoding) == 0:
        raise Exception("\n\nERROR: file \'" + file_name + "\' doesn't contain correct face image\n\n")
    elif len(face_encoding) > 1:
        raise Exception("\n\nERROR: file \'" + file_name + "\' contain more than 1 faces\n\n")

    return face_encoding[0]


def read_known_faces():
    """
    Load database of photo to model

    Name of every photo should be in following format:
        <unioque-id>_<last-name>

    """
    known_face_encodings = []
    known_face_names = []

    for file_name in glob.glob(DATASET_FOLDER + "/*.jpg"):
        face_encoding = read_face_encoding(file_name)

        known_face_encodings.append(face_encoding)

        name = file_name.split('.jpg')[0].split('/')[-1]
        if len(name.split('_')) != 2:
            raise Exception("\n\nERROR: file \'" + file_name + "\' has incorrect name\n\n")

        known_face_names.append(name)

    return known_face_encodings, known_face_names


def add_new_known_face(new_file_name, known_face_encodings, known_face_names):
    """
    Function for adding new person in database

    @parameter new_file_name: path to the new photo
    @type new_file_name: C{string}

    @parameter known_face_encodings: List of encoding vectors of faces from current database
    @type known_face_encodings: C{list}

    @parameter known_face_names: path to the new photo
    @type known_face_names: C{list}

    """
    face_encoding = read_face_encoding(new_file_name)
    known_face_encodings.append(face_encoding)

    known_face_names.append(new_file_name)

    return known_face_encodings, known_face_names


def update_known_face(new_file_name, known_face_encodings, known_face_names):
    """
    Function for changing face's encoding for certain person in database

    @parameter new_file_name: path to the new photo
    @type new_file_name: C{string}

    @parameter known_face_encodings: List of encoding vectors of faces from current database
    @type known_face_encodings: C{list}

    @parameter known_face_names: path to the new photo
    @type known_face_names: C{list}

    """
    name = new_file_name.split('.jpg')[0].split('/')[-1]
    finding = False

    for i in range(0, len(known_face_names)):
        if name == known_face_names[i]:
            finding = True
            face_encoding = read_face_encoding(new_file_name)
            known_face_encodings[i] = face_encoding
            break
    if finding:
        return known_face_encodings, known_face_names
    else:
        raise Exception("\n\nERROR: there are no name \'" + name + "\' in the base of known faces\n\n")


def delete_known_face(file_name, known_face_encodings, known_face_names):
    """
    Function for deleting face's encoding for certain person in database

    @parameter file_name: path to the new photo
    @type file_name: C{string}

    @parameter known_face_encodings: List of encoding vectors of faces from current database
    @type known_face_encodings: C{list}

    @parameter known_face_names: path to the new photo
    @type known_face_names: C{list}

    """
    name = file_name.split('.jpg')[0].split('/')[-1]
    finding = False

    for i in range(0, len(known_face_names)):
        if name == known_face_names[i]:
            finding = True
            del known_face_names[i]
            del known_face_encodings[i]
            break
    if finding:
        return known_face_encodings, known_face_names
    else:
        raise Exception("\n\nERROR: there are no name \'" + name + "\' in the base of known faces\n\n")


def get_text_coordinates(text, face_coordinates):
    """
    Function for determination coordinates of person's name on frame

    @parameter text: signature of highlighted frame
    @type text: C{string}

    @parameter face_coordinates: Coordinates of frame for recognizing face
    @type face_coordinates: C{dict}

    """
    text_coordinates = {}
    (text_width, text_height) = cv2.getTextSize(text, TEXT_FONT, fontScale=1.0, thickness=1)[0]
    text_coordinates["left"] = int(face_coordinates["left"] + (face_coordinates["right"] - face_coordinates["left"]) / 2
                                   - text_width / 2)
    text_coordinates["right"] = text_coordinates["left"] + text_width
    text_coordinates["top"] = face_coordinates["bottom"]
    text_coordinates["bottom"] = text_coordinates["top"] + text_height
    return text_coordinates


def recognize_person(known_face_encodings, known_face_names):
    """
    Function for recognize person's body on video

    @parameter known_face_encodings: List of encoding vectors of faces from current database
    @type known_face_encodings: C{list}

    @parameter known_face_names: path to the new photo
    @type known_face_names: C{list}

    """

    # Initialize model for body detection
    detection_graph = tf.Graph()
    with detection_graph.as_default():
        od_graph_def = tf.GraphDef()
        with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
            serialized_graph = fid.read()
            od_graph_def.ParseFromString(serialized_graph)
            tf.import_graph_def(od_graph_def, name='')

    label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
    categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES,
                                                                use_display_name=True)

    category_index = label_map_util.create_category_index(categories)

    # Initialize connect with server
    credentials = pika.PlainCredentials(USER, PASSWORD)
    parameters = pika.ConnectionParameters(IP, PORT, credentials=credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # Initialize parameters for logging
    last_visible = np.array([False for _ in range(0, len(known_face_names))], dtype=np.bool)
    last_visible_time = [datetime.datetime.min for _ in range(0, len(known_face_names))]

    last_no_face = False
    last_no_face_time = datetime.datetime.min

    last_unknown = False
    last_unknown_time = datetime.datetime.min

    last_update_face_base = datetime.datetime(1, 1, 1, 0, 0, 0)
    update_time = time.time() + TIMEOUT_UPDATE

    process_this_frame = True

    # Get video stream and processed frame
    camera = cv2.VideoCapture(CAMERA_ID)

    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            while True:
                # Check for timeout for updating database
                if time.time() > update_time:
                    update_time = time.time() + TIMEOUT_UPDATE
                    if (datetime.datetime.now() - last_update_face_base).days >= TIME_TO_UPDATE:
                        known_face_encodings, known_face_names = read_known_faces()
                        last_update_face_base = datetime.datetime.now()

                # Get picture from stream
                ret, frame = camera.read()
                small_frame = cv2.resize(frame, (0, 0), fx=1/DECREASING_LEVEL, fy=1/DECREASING_LEVEL)
                rgb_small_frame = small_frame[:, :, ::-1]

                if process_this_frame:
                    # Get detected objects (bodies and faces)
                    image_np_expanded = np.expand_dims(frame, axis=0)
                    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                    boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                    scores = detection_graph.get_tensor_by_name('detection_scores:0')
                    classes = detection_graph.get_tensor_by_name('detection_classes:0')
                    num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                    (boxes, scores, classes, num_detections) = sess.run(
                        [boxes, scores, classes, num_detections],
                        feed_dict={image_tensor: image_np_expanded})

                    n_body = 0
                    for i in range(0, scores.shape[1]):
                        if scores[0][i] > 0.5:
                            n_body += 1
                        else:
                            break

                    # Get coordinates of box around faces
                    face_locations = face_recognition.face_locations(rgb_small_frame)

                    now_no_face = False

                    # Check number of detected faces and bodies
                    n_faces = len(face_locations)
                    if n_body > n_faces:
                        # Send alarm if anybody try to hide face
                        now_no_face = True
                        now = datetime.datetime.now()
                        if not last_no_face:
                            last_no_face_time = now
                        else:
                            if last_no_face_time != datetime.datetime.min:
                                delta = now - last_no_face_time
                                if delta.seconds > TIMEOUT:
                                    with open("logging.txt", "a+") as log_file:
                                        user_id = None
                                        send_data = {"userId": user_id,
                                                     "cameraId": str(CAMERA_ID)}
                                        json_send_data = json.dumps(send_data)

                                        channel.basic_publish(exchange='', routing_key='users', body=json_send_data)

                                        log_file.write("\nALARM NO FACE at " + now.strftime("%H:%M:%S %d-%m-%Y"))
                                        last_no_face_time = datetime.datetime.min

                    # Get identified faces embeddings
                    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
                    face_names = []
                    now_visible = np.array([False for _ in range(0, len(known_face_names))], dtype=np.bool)
                    now_unknown = False

                    # Find similar face from database
                    for face_encoding in face_encodings:
                        name = "Unknown"
                        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)

                        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                        best_match_index = np.argmin(face_distances)
                        if matches[best_match_index]:
                            # Current face was recognized - send record about it
                            name = known_face_names[best_match_index]
                            now_visible[best_match_index] = True
                            now = datetime.datetime.now()
                            if not last_visible[best_match_index]:
                                last_visible_time[best_match_index] = now
                            else:
                                if last_visible_time[best_match_index] != datetime.datetime.min:
                                    delta = now - last_visible_time[best_match_index]
                                    if delta.seconds > TIMEOUT:
                                        with open("logging.txt", "a+") as log_file:
                                            user_id = name.split('_')[0]
                                            send_data = {"userId": user_id, "cameraId": CAMERA_ID}
                                            json_send_data = json.dumps(send_data)

                                            channel.basic_publish(exchange='', routing_key='users', body=json_send_data)

                                            log_file.write(
                                                "\nRecognize " + name + " at " + now.strftime("%H:%M:%S %d-%m-%Y"))
                                            last_visible_time[best_match_index] = datetime.datetime.min
                        else:
                            # Current face was NOT recognized - send alarm about it
                            now_unknown = True
                            now = datetime.datetime.now()
                            if not last_unknown:
                                last_unknown_time = now
                            else:
                                if last_unknown_time != datetime.datetime.min:
                                    delta = now - last_unknown_time
                                    if delta.seconds > TIMEOUT:
                                        with open("logging.txt", "a+") as log_file:
                                            user_id = None
                                            send_data = {"userId": user_id, "cameraId": CAMERA_ID}
                                            json_send_data = json.dumps(send_data)

                                            channel.basic_publish(exchange='', routing_key='users', body=json_send_data)

                                            log_file.write("\nALARM at " + now.strftime("%H:%M:%S %d-%m-%Y"))
                                            last_unknown_time = datetime.datetime.min

                        face_names.append(name)

                    last_visible = copy.deepcopy(now_visible)
                    last_no_face = now_no_face
                    last_unknown = now_unknown

                process_this_frame = not process_this_frame

                # Visualize box around person
                vis_util.visualize_boxes_and_labels_on_image_array(frame, np.squeeze(boxes),
                                                                   np.squeeze(classes).astype(np.int32),
                                                                   np.squeeze(scores), category_index,
                                                                   use_normalized_coordinates=True,
                                                                   line_thickness=8, skip_labels=True,
                                                                   skip_scores=True)

                # Visualize box around face with name
                for (face_top, face_right, face_bottom, face_left), name in zip(face_locations, face_names):
                    face_coordinates = {"top": face_top * DECREASING_LEVEL,
                                        "right": face_right * DECREASING_LEVEL,
                                        "bottom": face_bottom * DECREASING_LEVEL,
                                        "left": face_left * DECREASING_LEVEL
                    }

                    if name == "Unknown":
                        color = RED_COLOR
                    else:
                        color = BLUE_COLOR

                    # Get face's coordinates
                    cv2.rectangle(frame, (face_coordinates["left"], face_coordinates["top"]),
                                         (face_coordinates["right"], face_coordinates["bottom"]), color, 2)

                    # Visualize person's name if he was recognized
                    text_coordinates = get_text_coordinates(name, face_coordinates)
                    cv2.rectangle(frame, (text_coordinates["left"] - 5, face_coordinates["bottom"]),
                                  (text_coordinates["right"] + 5, text_coordinates["bottom"] + 8),
                                  color, cv2.FILLED)
                    cv2.putText(frame, name, (text_coordinates["left"], text_coordinates["bottom"] + 4),
                                TEXT_FONT, 1.0, WHITE_COLOR, 1)

                cv2.imshow('Video', frame)

                # Press 'q' to quit
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

                process_this_frame = not process_this_frame

    connection.close()
    camera.release()
    cv2.destroyAllWindows()

    return known_face_encodings, known_face_names


if __name__ == "__main__":

    known_face_encodings, known_face_names = read_known_faces()

    known_face_encodings, known_face_names = recognize_person(known_face_encodings, known_face_names)

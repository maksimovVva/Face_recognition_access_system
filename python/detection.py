import cv2
import os
import numpy as np
import tensorflow as tf
import face_recognition

from object_detection.utils import label_map_util

from object_detection.utils import visualization_utils as vis_util

MODEL_NAME = 'body_detection_model'
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'
PATH_TO_LABELS = os.path.join('object_detection', 'data', 'mscoco_label_map.pbtxt')
NUM_CLASSES = 1

CAMERA_ID = 0


# Function for recognize person's body on video
def recognize_person():
    # initialize model
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
    process_this_frame = True

    # get video stream
    camera = cv2.VideoCapture(CAMERA_ID)

    with detection_graph.as_default():
        with tf.Session(graph=detection_graph) as sess:
            while True:

                # get picture from stream
                ret, frame = camera.read()
                small_frame = cv2.resize(frame, (0, 0), fx=1 / 2, fy=1 / 2)
                rgb_small_frame = small_frame[:, :, ::-1]

                if process_this_frame:
                    # get detected objects
                    image_np_expanded = np.expand_dims(frame, axis=0)
                    image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                    boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                    scores = detection_graph.get_tensor_by_name('detection_scores:0')
                    classes = detection_graph.get_tensor_by_name('detection_classes:0')
                    num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                    (boxes, scores, classes, num_detections) = sess.run(
                        [boxes, scores, classes, num_detections],
                        feed_dict={image_tensor: image_np_expanded})

                face_locations = face_recognition.face_locations(rgb_small_frame)

                face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
                face_names = ["Unknown" for _ in face_locations]

                # visualize box around person
                vis_util.visualize_boxes_and_labels_on_image_array(frame, np.squeeze(boxes),
                                                                   np.squeeze(classes).astype(np.int32),
                                                                   np.squeeze(scores), category_index,
                                                                   use_normalized_coordinates=True,
                                                                   line_thickness=8, skip_labels=True,
                                                                   skip_scores=True)

                for (top, right, bottom, left), name in zip(face_locations, face_names):
                    top *= 2
                    right *= 2
                    bottom *= 2
                    left *= 2

                    color = (0, 0, 255)

                    cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
                    font = cv2.FONT_HERSHEY_DUPLEX
                    (text_width, text_height) = cv2.getTextSize(name, font, fontScale=1.0, thickness=1)[0]
                    text_left = int(left + (right - left) / 2 - text_width / 2)
                    cv2.rectangle(frame, (text_left - 5, bottom), (text_left + text_width + 5, bottom + text_height + 8), color,
                                  cv2.FILLED)

                    cv2.putText(frame, name, (text_left, bottom + text_height + 4), font, 1.0, (245, 245, 245), 1)

                cv2.imshow('Video', frame)

                # press 'q' to quit
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

                process_this_frame = not process_this_frame

    camera.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    recognize_person()

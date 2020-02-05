import cv2
import numpy as np
import tensorflow as tf

from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util


path_to_ckpt = 'body_detection_model/frozen_inference_graph.pb'
path_to_labels = 'object_detection/data/mscoco_label_map.pbtxt'

camera=cv2.VideoCapture(0)

detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(path_to_ckpt, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

label_map = label_map_util.load_labelmap(path_to_labels)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=1,
                                                            use_display_name=True)

category_index = label_map_util.create_category_index(categories)
process_this_frame = True

with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
        while True:

            ret, frame = camera.read()

            if process_this_frame:
                image_np_expanded = np.expand_dims(frame, axis=0)
                image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                scores = detection_graph.get_tensor_by_name('detection_scores:0')
                classes = detection_graph.get_tensor_by_name('detection_classes:0')
                num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                (boxes, scores, classes, num_detections) = sess.run(
                    [boxes, scores, classes, num_detections],
                    feed_dict={image_tensor: image_np_expanded})

            vis_util.visualize_boxes_and_labels_on_image_array(frame, np.squeeze(boxes),
                                                               np.squeeze(classes).astype(np.int32),
                                                               np.squeeze(scores), category_index,
                                                               use_normalized_coordinates=True,
                                                               line_thickness=8, skip_labels=True,
                                                               skip_scores=True)

            cv2.imshow('Video', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            process_this_frame = not process_this_frame

camera.release()
cv2.destroyAllWindows()

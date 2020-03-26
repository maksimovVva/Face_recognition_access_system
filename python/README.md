# Recognition System

Данная компонента представляет собой интерфейс для **распознования и идентификации людей** по видео потоку в режиме онлайн.

## Зависимости

Данная компонента написана на языке **Python 3** и работает на **Windows/Linux/MacOS** платформах.

Необходимые библиотеки для работы:

* *Numpy*
* *Pika*
* *OpenCV for Python*
* *Face_recognition*
* *Tensorflow*

## Состав компоненты
Данная компонента состоит из следующих частей:
* **body_detection_model** - модель для **детектирования тела человека**.
* **object_detection** - интерфейс для работы с **Tensorflow Api Object Detection** - также необходим для детектирования человека.
Данный интерфейс находится в открытом доступе и занимает достаточно много места, поэтому нами было принято решение не включать его в данный репозиторий. Инструкция по скачиванию и настройки данной части находится в разделе **"Первый запуск"**.
* **detection.py** - основной код работы компоненты.
* **run_detection.py** - вспомогательный срипт для запуска компоненты на Linux-подобных системах.


## Первый запуск
Для запуска компоненты нужна некоторая *предварительная настройка*.

После установки всех **необходимых библиотек** и **клонирования репозитория**, необходимо:
1) Скопировать в корень папки Python папку *object_detection* из [репозитория](https://github.com/tensorflow/models/tree/master/research/object_detection) и установить ее необходимые [настройки](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/installation.md), а имеено:
    
    1.1) Настройка COCO API:
    
        git clone https://github.com/cocodataset/cocoapi.git
        cd cocoapi/PythonAPI
        make
        cp -r pycocotools <path_to_tensorflow>/models/research/
    1.2) Protobuf Compilation
    
        # From tensorflow/models/research/
        protoc object_detection/protos/*.proto --python_out=.

2) Настроить все необходимые параметры для скрипта **detection.py**, а именно:

    * проверить правильность всех путей до необходимых файлов;
    * идентификационный номер камеры и уровень сжатия картинки (CAMERA_ID, DECREASING_LEVEL);
    * выставить значения параметров для взаимодействия с сервером (USER, PASSWORD, IP, PORT).
    
3) Запустить распознование, используя **run_detection.sh**.

#!/bin/bash

export PYTHONPATH=$PYTHONPATH:`pwd`:`pwd`/slim

rm -rf logging.txt

python detection.py

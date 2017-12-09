#!/usr/bin/env bash

confighubPull.py \
   -t "<token>" \
   -c "<context>" \
   -a "Python Pull Test" \
   -f "file1.xml > /to/file1.xml" \
   -f "file2.conf > /to/file2.conf" \
   -o "out/config.json" \
   --no-props

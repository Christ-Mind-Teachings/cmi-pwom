#!/bin/bash

bin="../_bin/bin"
rm *.json

for i in `cat contents`; do
  ${bin}/prep -b wos $i
done


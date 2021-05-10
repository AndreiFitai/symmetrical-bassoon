#!/bin/bash

cd ./translation-service && chmod +x wait-for-it.sh && npm i

cd ..

cd ./subtitle-service && npm i

cd ..

cd ./email-service && npm i --silent

cd ..

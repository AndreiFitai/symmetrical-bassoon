#!/bin/bash

cd ./translation-service

chmod +x wait-for-it.sh

cd ..

docker-compose -f docker-compose.dev.yaml up --build --force-rm --parallel
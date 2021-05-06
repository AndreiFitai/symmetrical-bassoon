#!/bin/bash

cd ./translation-service && chmod +x wait-for-it.sh && npm i

cd ..

cd ./subtitle-service && npm i

cd ..

cd ./email-service && npm i --silent

cd ..

chmod 755 scripts/build-dev.sh scripts/build-prod.sh scripts/up-dev.sh scripts/up-prod.sh

chmod +x scripts/build-dev.sh scripts/build-prod.sh scripts/up-dev.sh scripts/up-prod.sh

#!/bin/bash

cd ./translation-service && chmod +x wait-for-it.sh && npm i

cd ..

cd ./subtitle-service && npm i

cd ..

cd ./email-service && npm i --silent

cd ..

chmod 755 scripts/dev-build.sh scripts/prod-build.sh scripts/dev-up.sh scripts/prod-up.sh

chmod +x scripts/dev-build.sh scripts/prod-build.sh scripts/dev-up.sh scripts/prod-up.sh

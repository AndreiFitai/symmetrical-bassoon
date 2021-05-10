#!/bin/bash

cd ./email-service && npm run test

wait $! 

cd ..

cd ./subtitle-service && npm run test

wait $! 

cd ..

cd ./translation-service && npm run test

wait $! 

cd ..

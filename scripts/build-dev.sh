#!/bin/bash

docker-compose -f docker-compose.dev.yaml build --force-rm --parallel
docker-compose -f docker-compose.dev.yaml up
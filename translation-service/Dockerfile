FROM node:14-alpine as base

RUN apk add --no-cache bash

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm ci --no-optional

COPY . .

FROM base as production

RUN npm run build

EXPOSE 8100

COPY wait-for-it.sh wait-for-it.sh 

RUN chmod +x wait-for-it.sh
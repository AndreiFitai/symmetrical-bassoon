FROM node:14-alpine as base

RUN apk add --update --no-cache bash

RUN mkdir -p /srv/app

WORKDIR /srv/app

COPY package.json package-lock.json ./

COPY src /app/src

RUN npm ci --no-optional

FROM base AS build

COPY . /srv/app

RUN npm run build

FROM build AS release

EXPOSE 8090
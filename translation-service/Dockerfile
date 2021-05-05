FROM node:14-alpine as base

RUN mkdir -p /usr/src/app/

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm ci --no-optional

COPY . .

FROM base as production

RUN npm run build

EXPOSE 8100
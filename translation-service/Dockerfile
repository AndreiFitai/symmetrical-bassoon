FROM node:14-alpine AS build

WORKDIR /srv

COPY package*.json /srv/

RUN npm ci

COPY tsconfig.json /srv/

COPY ormconfig.js /srv/

COPY src /srv/src/

RUN npm run build

RUN npm ci --production

FROM node:14-alpine

RUN apk add --update --no-cache bash

WORKDIR /srv

COPY --from=build /srv/node_modules /srv/node_modules

COPY --from=build /srv/dist /srv/dist

COPY --from=build /srv/package*.json /srv/

COPY ./ormconfig.js /srv/

COPY wait-for-it.sh wait-for-it.sh 

RUN chmod +x wait-for-it.sh



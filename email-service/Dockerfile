FROM node:14-alpine AS base

WORKDIR /srv

COPY package*.json /srv/

RUN npm ci --no-optional

COPY tsconfig.json /srv/

COPY src /srv/src/

FROM base as build

RUN npm run build

RUN npm ci --production --no-optional

FROM node:14-alpine

WORKDIR /srv

COPY --from=build /srv/node_modules /srv/node_modules

COPY --from=build /srv/dist /srv/dist

COPY --from=build /srv/package*.json /srv/


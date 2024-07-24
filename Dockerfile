FROM node:lts-alpine@sha256:5144f275bf24e03ec5d8629d72eebb66d403a673b668f8fda0dd01176984a701 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

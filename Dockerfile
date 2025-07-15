FROM node:lts-alpine@sha256:0f2b9a8d6a7c915b006beeaf41c5675a3e92d7ba548bb9a42263a3cac1e15867 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

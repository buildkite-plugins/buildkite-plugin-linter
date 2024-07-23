FROM node:lts-alpine@sha256:cf5e7b223dea2efc6a73c55c6655b740576fe9c2596927a53533feded0fb5f5f as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
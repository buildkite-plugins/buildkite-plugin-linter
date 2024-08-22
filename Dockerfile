FROM node:lts-alpine@sha256:1a526b97cace6b4006256570efa1a29cd1fe4b96a5301f8d48e87c5139438a45 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

FROM node:lts-alpine@sha256:8be1dd87743236c7d064aac3733befca88ba9bc6f65c7f6bbd93199f27c33287 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

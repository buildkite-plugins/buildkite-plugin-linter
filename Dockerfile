FROM node:18-alpine@sha256:fda98168118e5a8f4269efca4101ee51dd5c75c0fe56d8eb6fad80455c2f5827 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
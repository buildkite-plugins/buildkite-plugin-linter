FROM node:18-alpine@sha256:b3ca07adf425d043e180464aac97cb4f7a566651f77f4ecb87b10c10788644bb as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
FROM node:18-alpine@sha256:8da3d86c911f91712b41e0b2329f7e95e8ee27b9facc5c663d5e5f91ad5e7cad as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
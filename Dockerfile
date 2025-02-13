FROM node:lts-alpine@sha256:b5b4f313535a50a4f7f9f23a592236e40e3cbf24391f0ac36fa173a10640a7ee as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

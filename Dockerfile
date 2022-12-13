FROM node:18-alpine@sha256:a136ed7b0df71082cdb171f36d640ea3b392a5c70401c642326acee767b8c540 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
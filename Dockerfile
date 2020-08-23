FROM node:12-alpine@sha256:0b5c7eb38785da1ad4c105930faca0bc546dfcceb0464724456e277fd5e3f6e2 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
FROM node:lts-alpine@sha256:5539840ce9d013fa13e3b9814c9353024be7ac75aca5db6d039504a56c04ea59 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

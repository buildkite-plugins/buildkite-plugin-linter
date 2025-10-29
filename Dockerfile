FROM node:lts-alpine@sha256:89a233cdb3625c9b471500eecc1130d440438db599e864bfba57c2cf956e799f as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

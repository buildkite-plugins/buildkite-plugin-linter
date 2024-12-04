FROM node:lts-alpine@sha256:96cc8323e25c8cc6ddcb8b965e135cfd57846e8003ec0d7bcec16c5fd5f6d39f as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

FROM node:12-alpine@sha256:dfa564312367b1a8fca8db7ae4bae102b28e68b39ebcb7b17022c938f105846b as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
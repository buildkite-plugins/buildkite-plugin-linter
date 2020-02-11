FROM node:12-alpine@sha256:e280e51eaa6e626e4df58a5c1f141e453807c30596179330992c55a0bf4114ca
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]
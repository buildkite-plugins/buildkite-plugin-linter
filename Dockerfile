FROM node:lts-alpine@sha256:f9a425f0ef0b8ab90c7be73eb85cc3a5ae37cfefd3c315db1d787c58eef44fad as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

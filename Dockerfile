FROM node:lts-alpine@sha256:26af2660b4251770e85475170641b3cd2c1b3785f8801309e738ee35eb29acc2 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

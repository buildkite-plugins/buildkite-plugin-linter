FROM node:lts-alpine@sha256:c29616372680176cc197fac55bde7f2a80723328c0838a901e960c3e6d570d4b as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

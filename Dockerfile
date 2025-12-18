FROM node:lts-alpine@sha256:951203ef9d4e576c355194222fd19c2c7736f91228deb112675414ae3a7c9046 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

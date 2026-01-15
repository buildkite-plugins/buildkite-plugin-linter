FROM node:lts-alpine@sha256:abba54e1aa65f9d795ec66541e3e829986072483bf7812ea66df83dd69f95dae as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

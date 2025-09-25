FROM node:lts-alpine@sha256:cb3143549582cc5f74f26f0992cdef4a422b22128cb517f94173a5f910fa4ee7 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

FROM node:lts-alpine@sha256:ca5d399560a9d239cbfa28eec00417f1505e5e108f3ec6938d230767eaa81f61 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base
FROM node:lts-alpine@sha256:152270cd4bd094d216a84cbc3c5eb1791afb05af00b811e2f0f04bdc6c473602 as base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

FROM node:12-alpine@sha256:08f387b98dd00c1a746580dbd91e538d534911cdd14f6d1d0b36b4687e823006
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]
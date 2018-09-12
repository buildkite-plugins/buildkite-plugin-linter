FROM node:10.10.0-alpine@sha256:565dfb5f10143efd5f4c9df75a63d765adcd14b150fc61e5c1d54d70cb006e86
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
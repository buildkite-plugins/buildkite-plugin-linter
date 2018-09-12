FROM node:10.10.0-alpine@sha256:260b6f423242b7ac5e9b476ef25f26d72d1b55353a5c9be039c91398388cdd50
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
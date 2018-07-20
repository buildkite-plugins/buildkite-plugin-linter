FROM node:10.7.0-alpine@sha256:cf2e3cd5251273c53bd5497b1a912a9956fb775710df8e015c835719f2ce7e14
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
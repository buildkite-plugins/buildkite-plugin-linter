FROM node:10.9.0-alpine@sha256:3c8d1894236663c8efd24dc6e979b0f927e81b711e6023b52e5b4617d45b619f
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
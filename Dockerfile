FROM node:10.6.0-alpine@sha256:e771c64a6bd0d64179de2c803c1af491ca4ce2dc418428525f2f7216495b18be
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
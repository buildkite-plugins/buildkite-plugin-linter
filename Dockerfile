FROM node:10.13.0-alpine@sha256:22c8219b21f86dfd7398ce1f62c48a022fecdcf0ad7bf3b0681131bd04a023a2
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
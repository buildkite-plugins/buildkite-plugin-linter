FROM node:10.15.3-alpine@sha256:5f9cd51eaeeb2eaec4a9bcf92d18d8908f1d489534cabff04b5f4eafae877cee
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
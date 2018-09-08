FROM node:10.10.0-alpine@sha256:047cc73153862a7f9cf38f4a5897264d66ba975c68f2ec7d9b5f7a63ac7ff749
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
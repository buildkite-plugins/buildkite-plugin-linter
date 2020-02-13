FROM node:12-alpine@sha256:aa52cfbaef33dc2f3bc41228072bce75705733d4d90cf086260df15fd7c65319
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]
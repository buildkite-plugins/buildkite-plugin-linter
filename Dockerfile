FROM node:10.16.0-alpine@sha256:07897ec27318d8e43cfc6b1762e7a28ed01479ba4927aca0cdff53c1de9ea6fd
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
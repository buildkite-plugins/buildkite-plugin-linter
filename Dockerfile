FROM node:10.15.3-alpine@sha256:aa28f3b6b4087b3f289bebaca8d3fb82b93137ae739aa67df3a04892d521958e
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
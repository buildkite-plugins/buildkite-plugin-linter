FROM node:10.15.0-alpine@sha256:409726705cd454a527af5032f67ef068556f10d3c40bb4cc5c6ed875e686b00e
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
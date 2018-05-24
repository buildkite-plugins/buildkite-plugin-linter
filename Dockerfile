FROM       node:9-alpine@sha256:91d8397253ab507f0fbd0ca5b1a423c5a5f011b07650719dc28d1d5484cf031c
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
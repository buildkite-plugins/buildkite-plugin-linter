FROM       node:9-alpine@sha256:de0fc4272136f43c366f68681743b5717e2e7db7646b20c714005274cd638204
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
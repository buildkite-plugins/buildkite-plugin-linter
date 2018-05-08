FROM       node:9-alpine@sha256:e9742137d0a73a0d2197363a04bf8e42c0e297a5c7ab1d0f43d735afca48bf9a
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
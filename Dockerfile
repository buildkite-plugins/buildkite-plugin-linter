FROM node:10.7.0-alpine@sha256:e8e64ea9b3a603fa3bf36e5bf459a9392473eeb48240f14d45016d02ebd6c2b0
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
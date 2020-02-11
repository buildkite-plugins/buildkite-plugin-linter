FROM node:12-alpine@sha256:53f3ac17d2b5084361606457acc8e16ebea3fd5536dc79b374774e8b99ee62ff
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm ci
ENTRYPOINT ["lint"]
FROM node:10.16.0-alpine@sha256:0b9999cc406d842543be109c0d9dcf6198a96cc3dacdf2a4fb015a6dcc8c17b8
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM node:10.14.2-alpine@sha256:f0d1b7428e8fb92db7a97572eceba22199768cd3783a199cb01de30b6ef88c54
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM node:10.16.0-alpine@sha256:730e6a60c7e3e62d82218f313b4d1c8ffbfc7adff9e11dd66ea8b4e61c269a06
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
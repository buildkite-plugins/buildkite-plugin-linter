FROM node:10.15.3-alpine@sha256:101042fddccda3a5ae5fbd6752fa568c663e9dc18cec7f7e7b8300c88480fcbe
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
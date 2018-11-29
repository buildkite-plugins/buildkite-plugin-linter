FROM node:10.14.0-alpine@sha256:b3e157beaf4f780f6e6ed058a438989afb0e5174b812c089e731b9f75b4db416
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
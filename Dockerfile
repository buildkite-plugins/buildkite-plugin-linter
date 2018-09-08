FROM node:10.10.0-alpine@sha256:1e7d71edcd8088bd81a828a6ea6d8be6dbf92039bbd9e2ecf2eb76abd295f832
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
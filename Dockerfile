FROM node:10.15.2-alpine@sha256:9232f8fb2e1838c50920e70eb20370c7503d50954f976c11c20f752c8b9dc07f
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
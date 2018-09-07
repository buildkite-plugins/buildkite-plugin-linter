FROM node:10.9.0-alpine@sha256:a4212307484e6b662806a538ec6352182aaf8b4b748644aaa7f6e87bda159097
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
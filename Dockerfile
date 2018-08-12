FROM node:10.8.0-alpine@sha256:962dc023d8598778df81a1a52719bd4ed7f341661742330bfdc72ca8241e58d6
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
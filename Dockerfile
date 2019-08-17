FROM node:10.16.3-alpine@sha256:abd8fa1df6dc74213878a96d9c38601ffbb9deb80b0030e758a690699022d639
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
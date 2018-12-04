FROM node:10.14.1-alpine@sha256:35fcf0a48f57bef4bafa0f844f62edb659d036364a1d086995efe5b43ca0c4af
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
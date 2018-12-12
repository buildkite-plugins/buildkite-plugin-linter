FROM node:10.14.2-alpine@sha256:539572fabf307f60709a4e0c5f9595f37ed99200b2224b0e42bef539415ac319
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM       node:9-alpine
WORKDIR    /src
ENV        PATH=$PATH:/src/bin:/src/node_modules/.bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
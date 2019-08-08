FROM node:10.16.1-alpine@sha256:ccf88c24f801feaadf43520ad8979daec308ee2cc42331a1b3f1e1ce384a1714
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
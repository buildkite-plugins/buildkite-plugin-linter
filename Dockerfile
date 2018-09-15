FROM node:10.10.0-alpine@sha256:fcab88e96877f3a592be65131ca08d613db8558fefbc3fcc988876fd3b5a447d
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
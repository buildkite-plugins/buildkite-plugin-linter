FROM node:10.15.2-alpine@sha256:8ac058c7735e957c455dea33bce69c90e3dd83793e0c8ef6f8d73d6a894980c3
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM node:10.15.2-alpine@sha256:7755d65e16967f73354e3f7ef3b61bba3384074554cd3183f35da3050010a2c5
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
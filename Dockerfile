FROM node:10.15.3-alpine@sha256:f2ef15bb0017aeca6573f7de6f4f872aba1f7d4aeb9e8cb2f923d0a12f51a946
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM node:10.10.0-alpine@sha256:c9e98df001371ec4510e9b22bfb8a19e5023afe53f3013f316d648d4052feacf
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
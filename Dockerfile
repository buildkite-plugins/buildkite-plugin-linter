FROM node:10.14.1-alpine@sha256:2915a1ce37f05975545a77dd2731ce49e96de52f3166fa5ea0c973321e76d818
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
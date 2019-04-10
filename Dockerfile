FROM node:10.15.3-alpine@sha256:217ffdf869f094c8ba5bbd505ab51e13d6a7616ad999a5b740a3bb5f0490f2f3
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
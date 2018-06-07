FROM       node:9-alpine@sha256:991c1808b9702a34e4eb04092065e968e70b6a7f190a63192daf35c31e4c14af
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
FROM node:10.15.3-alpine@sha256:313c5c88acc0ec12a9abca9a83719065dfd54e94ffc56464b7ce24998dd2838d
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
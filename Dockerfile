FROM node:10.16.3-alpine@sha256:d732907d4f07416cb23010aa2f845e0b9c35b32905a8103757dd24415153dc66
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
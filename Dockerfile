FROM node:10.13.0-alpine@sha256:5ba2248f02abf173f0fb2bd6f84fca7f3616496c50c9333cdd362314ec2970d9
WORKDIR    /src
ENV        PATH=$PATH:/src/bin NODE_ENV=production PLUGIN_PATH=/plugin
ADD        . /src/
RUN        npm -s install
ENTRYPOINT ["lint"]
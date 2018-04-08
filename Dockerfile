FROM       node:9-alpine
WORKDIR    /src
ADD        index.js package.json package-lock.json /src/
ENV        NODE_ENV=production
RUN        npm -s install
ENTRYPOINT ["node", "/src/index.js"]
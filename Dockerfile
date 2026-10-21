ARG TARGETARCH
# Pin the official per-architecture images until the combined Node 24.22.1
# Alpine index is populated. Both include the compromised-key TLS blocklist.
FROM amd64/node:24.22.1-alpine3.24@sha256:db0a53f292c97d08787e801d900c309abb3bbe6b791664d291e5f1351c3b48c5 AS node-amd64
FROM arm64v8/node:24.22.1-alpine3.24@sha256:62b64e1d098748ee9fc89be2f2af55fdaa758c4d1b8675e5e460016de776d051 AS node-arm64

FROM node-${TARGETARCH} AS base
WORKDIR    /src
ENV        PATH=$PATH:/src/bin PLUGIN_PATH=/plugin
ADD        . /src/
RUN        apk upgrade --no-cache ca-certificates-bundle \
           && apk add --no-cache ca-certificates \
           && npm ci
ENTRYPOINT ["lint"]

FROM base as dev
RUN npm -s install
ENTRYPOINT []

FROM base

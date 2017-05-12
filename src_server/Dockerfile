FROM node:7.7-alpine

RUN apk add --update curl
COPY server.js .
COPY whale.js .

EXPOSE 3000
CMD node server.js
MAINTAINER Nicolas Huber (nicolas.huber@student.42.fr)

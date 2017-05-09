FROM node:7.7-alpine

COPY server.js .

EXPOSE 4000
CMD node server.js
MAINTAINER Nicolas Huber (nicolas.huber@student.42.fr)

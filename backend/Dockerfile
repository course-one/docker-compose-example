# parent image
FROM node:15.4.0-alpine3.10

# set working directory
WORKDIR /app

# install dependencies
ADD package.json package-lock.json ./
RUN npm install --production

# run server.js
EXPOSE 80
COPY server.js ./
CMD [ "node", "server.js" ]
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY next-episode-api ./

RUN npm install 

EXPOSE 5000

# "start": "node server.js",
CMD ["npm", "start"]
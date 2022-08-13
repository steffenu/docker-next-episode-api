FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

# Copy Folder to workdir
COPY next-episode-api ./

EXPOSE 5000

# "start": "node server.js",
CMD ["npm", "start"]
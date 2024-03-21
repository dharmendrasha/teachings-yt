FROM node:21.7.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src .

CMD [ "npm", "run", "dev" ]
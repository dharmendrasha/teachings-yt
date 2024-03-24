FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json .

RUN npm install

COPY src src/

CMD [ "npm", "run", "start" ]
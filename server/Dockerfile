FROM node:18-alpine

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
FROM node:18-alpine as build

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine as runtime

COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE $REACT_DOCKER_PORT

CMD ["nginx", "-g", "daemon off;"]
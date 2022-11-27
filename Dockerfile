FROM nginx:alpine

RUN npm install
RUN npm build

COPY build /usr/share/nginx/html
FROM nginx:alpine

RUN npm install
CMD ['npm' 'run' 'build']

COPY build /usr/share/nginx/html
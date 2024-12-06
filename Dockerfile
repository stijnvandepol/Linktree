FROM nginx:alpine

COPY src /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

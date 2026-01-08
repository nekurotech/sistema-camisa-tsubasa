FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

COPY default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

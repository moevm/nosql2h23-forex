FROM node:16-alpine3.15 as angular

RUN mkdir /client/

WORKDIR /client/

ADD . /client/

RUN npm i

RUN npm run build

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs/

COPY --from=angular /client/dist/frontend/ .

COPY ./apache_conf/httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

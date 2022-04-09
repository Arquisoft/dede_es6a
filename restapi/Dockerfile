FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es6a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG DB_USER="user"
ENV DB_USER=$DB_USER

ARG DB_PASSWORD="password"
ENV DB_PASSWORD=$DB_PASSWORD
    
ARG DB_URI="uri"
ENV DB_URI=$DB_URI

ARG DB_PORT="port"
ENV DB_PORT=$DB_PORT

CMD [ "npm", "start" ]
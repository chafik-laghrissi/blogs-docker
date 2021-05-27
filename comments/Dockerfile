#install image
FROM node:alpine
#install dependency
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
#init command
CMD [ "npm","start" ]

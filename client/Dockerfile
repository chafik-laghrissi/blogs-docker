#install image
FROM node:alpine
# Add the following line 
ENV CI=true
#install dependency
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
#init command
CMD [ "npm","start" ]

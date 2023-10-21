#FROM node:14 as DEV

#ENV  NODE_ENV = dev

#WORKDIR  /usr/src/client
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#COPY . .
#RUN npm run build

#CMD ["sh","-c","npm start"]


FROM node:14-alpine
ENV  NODE_ENV = dev

WORKDIR /client
COPY ./package.json .
RUN npm install
COPY . .
#RUN npm run build
CMD ["npm", "start"]


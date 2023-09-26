FROM node:16-alpine3.11

RUN mkdir /app && chmod 755 /app
WORKDIR /app
COPY package*.json .
RUN npm install
RUN chown -R node:node /app/node_modules
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
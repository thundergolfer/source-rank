FROM node:9
ADD package.json .
RUN npm install
ADD . .
RUN npm run build
ENTRYPOINT npm start
EXPOSE 4000

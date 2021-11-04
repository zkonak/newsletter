FROM node:14.18-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD ["node","app.js"]
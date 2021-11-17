FROM node:14.18-alpine
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm config set registry https://registry.saas.cagip.group.gca/api/npm/npm-remote/
RUN npm config set strict-ssl false
RUN npm install

EXPOSE 8080
CMD ["node","app.js"]

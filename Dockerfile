FROM node:lts
WORKDIR /app
COPY package*.json .
RUN npm install
COPY ./.env /app/.env
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
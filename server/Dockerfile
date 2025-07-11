FROM node:22

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5500

ENV PORT=5500

CMD ["node", "src/index.js"]

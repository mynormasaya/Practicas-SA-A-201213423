FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm rebuild bcrypt --build-from-source
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]

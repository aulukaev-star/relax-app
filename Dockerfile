FROM node:20-alpine

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm ci

# код
COPY . .

# если есть build-степ
# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

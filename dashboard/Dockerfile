FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

COPY package*.json ./

RUN npm run install --frozen-lockfile --production

CMD ["npm", "start"]
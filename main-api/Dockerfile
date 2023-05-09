FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build ./build

COPY package*.json ./

RUN npm install --frozen-lockfile --production

ENV NODE_ENV=production

CMD ["npm", "start"]
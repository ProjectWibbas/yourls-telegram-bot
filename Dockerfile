FROM node:18-slim AS build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM node:18-slim

WORKDIR /app

ENV NODE_ENV production

COPY --from=build /app/build/ /app/build/
COPY package*.json ./
RUN npm ci

EXPOSE 8443
CMD ["node", "-r", "dotenv/config", "build/"]
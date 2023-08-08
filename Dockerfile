FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

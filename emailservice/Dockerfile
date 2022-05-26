FROM node:17 as builder
WORKDIR /app
COPY ./ ./
RUN npm install
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/build  /usr/share/nginx/html
EXPOSE 80

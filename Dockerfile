FROM node:20-alpine as builder
WORKDIR /app
COPY . /app

RUN ls

RUN npm ci

COPY . .
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat nginx /etc/nginx/nginx.conf > /host/path/nginx.conf

RUN cat nginx /etc/nginx/nginx.conf
RUN ls /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
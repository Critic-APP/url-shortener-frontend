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
COPY nginx/nginx.conf /etc/nginx/
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# RUN cat /etc/nginx/nginx.conf
RUN ls /usr/share/nginx/html

ARG VITE_URL
ARG RAILWAY_PUBLIC_DOMAIN
RUN echo $VITE_URL
RUN echo $RAILWAY_PUBLIC_DOMAIN

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
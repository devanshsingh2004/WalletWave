
FROM node:20.15.0-alpine AS builder         # ← stage ❶  called “builder”
WORKDIR /app

# install deps separately for better cache reuse
COPY package*.json ./
RUN npm ci

# copy the rest of the source and build
COPY . .
RUN npm run build                            # outputs to /app/build


FROM nginx:1.27-alpine AS runner            # ← stage ❷  called “runner”
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

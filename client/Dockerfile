#######################################################################
# 1. Build the CRA bundle                                             #
#######################################################################
FROM node:20.15.0-alpine AS builder
WORKDIR /app

# Copy only lock-files for better cache
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build             



#######################################################################
# 2. Serve the bundle with Nginx                                      #
#######################################################################
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

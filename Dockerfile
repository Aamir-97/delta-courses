# Use an official Nginx image to serve the Angular app
FROM node:18 AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project to the container
COPY . .

# Build the Angular app
RUN npm run build:prod
# Build the Angular app
# RUN npm run build -- --configuration production --base-href /

# Use an official Nginx image to serve the Angular app
FROM nginx:alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove default nginx content
RUN rm -rf ./*

# Copy Angular build from the previous step
COPY --from=build /app/dist/delta-courses/browser ./

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

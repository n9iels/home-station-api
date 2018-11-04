# Stage 1: Build app
FROM node:8-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --pure-lockfile

# Bundle app source
COPY . .

# Build application
RUN yarn build-back
RUN yarn build-front -p

#########
# Stage 2: Run app
FROM node:8-alpine
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install app production dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --pure-lockfile

# Copy the app build
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/migrations ./migrations
COPY --from=build /usr/src/app/models ./models
COPY --from=build /usr/src/app/out ./out
COPY --from=build /usr/src/app/wwwroot ./wwwroot
COPY --from=build /usr/src/app/ecosystem.config.js ./ecosystem.config.js

# Copy .env and start
COPY .env ./

CMD [ "yarn", "pm2-runtime", "ecosystem.config.js", "--env production" ]
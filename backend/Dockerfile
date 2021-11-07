FROM node:14.18-alpine
ARG SPACE_SIZE=8192
ENV NODE_OPTIONS="--max-old-space-size=${SPACE_SIZE}"
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./yarn.lock /app/
RUN yarn install --silent
COPY . /app/
RUN yarn run build

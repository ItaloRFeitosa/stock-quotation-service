FROM node:16.14.2 AS base
WORKDIR /usr/src/app

EXPOSE 3002

COPY . ./

FROM base as dev
RUN npm ci --silent
CMD ["npm", "run", "dev"]

FROM base as prod
RUN npm ci --silent --only=production
CMD ["npm", "run", "start"]

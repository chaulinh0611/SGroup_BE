FROM node:22.1.0

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

FROM node:22.1.0-alpine AS base

WORKDIR /app

COPY ./package*.json ./
FROM base AS build

RUN npm install g npm 
RUN npm install

COPY . .

COPY .env .env

# RUN pnpm run build
# RUN pnpm prune --prod

# FROM base AS deloy
# #Define the deploy stage

# # COPY --from=build /app/dist /app/dist
# # COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

# CMD ["node", "src/index.js"]

CMD ["npm", "start"]

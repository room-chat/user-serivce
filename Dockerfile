FROM node:16 AS builder

ADD ./package*.json /app/
WORKDIR /app

RUN npm ci

COPY . /app
RUN npm run build
RUN npm prune --production

FROM node:16-alpine AS runner

USER node

COPY --from=builder --chown=node /app/package.json /app/package.json
COPY --from=builder --chown=node /app/dist /app/dist
COPY --from=builder --chown=node /app/node_modules /app/node_modules

WORKDIR /app

CMD ["node", "/app/dist/main.js"]
FROM gplane/pnpm:8.6.1-node20-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN pnpm fetch
RUN pnpm run build

LABEL fly_launch_runtime="nodejs"

ENV NODE_ENV production

EXPOSE 8080
CMD [ "pnpm", "run", "start" ]
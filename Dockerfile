FROM g-plane/pnpm-docker:8.6.1-node20-alpine

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN pnpm fetch --prod
RUN pnpm run build

LABEL fly_launch_runtime="nodejs"

ENV NODE_ENV production

EXPOSE 8080
CMD [ "pnpm", "run", "start" ]
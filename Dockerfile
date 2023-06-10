FROM alpine:latest as builder

ARG NODE_VERSION=18.16.0

# Dont know if needed 
ARG SECRET_POCKETBASE_URL
ENV SECRET_POCKETBASE_URL $SECRET_POCKETBASE_URL

RUN apk add curl
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION}

#######################################################################

RUN mkdir /app
WORKDIR /app

# NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# to install all modules: "npm install --production=false".
# Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

ENV NODE_ENV production

COPY . .

RUN npm install -g pnpm

RUN pnpm fetch --prod
RUN pnpm run build
FROM alpine:latest

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production
ENV PATH /root/.volta/bin:$PATH

EXPOSE 8080
CMD [ "pnpm", "run", "start" ]
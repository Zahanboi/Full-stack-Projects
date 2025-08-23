FROM node

ARG MONGO_URL
ENV MONGO_URL=$MONGO_URL

RUN mkdir -p /DockerApp/src
COPY . /DockerApp/src

CMD ["node", "/DockerApp/src/server.js"]

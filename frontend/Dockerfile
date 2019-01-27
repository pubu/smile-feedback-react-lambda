FROM node:alpine

COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN yarn

WORKDIR /app
ADD . /app

ENV PORT 3000

CMD npm run dev

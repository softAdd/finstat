FROM node:14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
COPY yarn.lock /app
COPY . /app
RUN yarn install --frozen-lockfile
RUN yarn build
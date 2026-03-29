FROM node:25-alpine3.22

WORKDIR /usr/src/app
COPY package*.json ./

# RUN npm install
# RUN npm install --legacy-peer-deps
RUN yarn install

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]
CMD ["yarn", "start:dev"]
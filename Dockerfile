FROM mhart/alpine-node:6.6.0
# Create app directory
RUN mkdir -p /app
COPY src /app/src

# Install app dependencies
COPY package.json /app
WORKDIR /app
RUN npm install
CMD npm start

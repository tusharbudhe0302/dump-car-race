FROM node:12-alpine

# Provides cached layer for node_modules
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /appserver && cp -a /tmp/node_modules /appserver/

# Define working directory
WORKDIR /appserver

COPY package.json /appserver

# Expose port
EXPOSE  "${PORT}"
#Run docker

# RUN npm install -g nodemon

RUN npm install



# RUN npm install -g json-server
# RUN npm install -g jest

# Entry point 

ENTRYPOINT ["npm","run","backend"]
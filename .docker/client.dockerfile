FROM node:12-alpine

# Provides cached layer for node_modules
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /webserver && cp -a /tmp/node_modules /webserver/

# Define working directory
WORKDIR /webserver

COPY package.json /webserver

# Expose port
EXPOSE  "${PORT}"
#Run docker

# RUN npm install -g @angular-cli
RUN npm install -g @angular/cli@latest

RUN npm install 

# RUN ng update --all --force
# Entry point 

ENTRYPOINT ["npm","start"]
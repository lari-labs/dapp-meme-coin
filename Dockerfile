#start from base image
FROM ghcr.io/agoric/agoric-3-proposals:main

#install curl and other nodejs dependencies
RUN apt-get update && apt-get install -y curl gnupg build-essential

#install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

#install nodejs 18.12.1 and set it as default
RUN /bin/bash -c "source  ~/.nvm/nvm.sh && nvm install 18.12.1 && nvm alias default 18.12.1"

ENV PATH="/root/.nvm/versions/node/v18.12.1/bin:${PATH}"

#remove the old js binaries
RUN rm -rf /usr/local/bin/nodejs /usr/local/bin/node

#create symlink to the new nodejs
RUN ln -s /root/.nvm/versions/node/v18.12.1/bin/node /usr/local/bin/node
RUN ln -s /root/.nvm/versions/node/v18.12.1/bin/node /usr/local/bin/nodejs

#verify nodejs version
RUN node -v && nodejs -v

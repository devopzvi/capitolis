FROM node

COPY ./slack-bot /slack-bot
RUN cd slack-bot &&\
    apt-get update &&\
    apt-get -y install apt-file &&\
    apt-file update &&\
    apt-get -y install vim &&\ 
    npm install

WORKDIR /slack-bot
ENTRYPOINT npm start

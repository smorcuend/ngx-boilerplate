FROM eu.gcr.io/maximal-record-121815/node6-base:v20

WORKDIR /code

ADD package.json /code

RUN npm install

ADD .bootstraprc karma.conf.js protractor.conf.js tsconfig.json tslint.json typedoc.json webpack.config.js /code/

ADD src /code/src
ADD config /code/config

RUN npm run prod

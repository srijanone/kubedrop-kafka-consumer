#!/usr/bin/env node
'use strict';

const express = require('express');
const logger = require('pino')();

const { emailRouter, healthCheckRouter } = require('./controllers');
const { KafkaService } = require('./services');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: 'Server is Running'
  });
});

// Adding routes
app.use(config['BASE_PATH'], healthCheckRouter);

// Adding 404 route
app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

app.use(function(error, req, res, next) {
  logger.error(error.stack);
  // error.message

  const response = {
    success: false,
    errors: error.stack
  };
  res.status(500).json(response);
});

// Process Event Data here
const processEvent = (payload) => {
  console.log('Payload: ', payload);
}

const startKafkaConsumer = async (message) => {
  const kafkaService = new KafkaService();
  
  await kafkaService.startConsumer(async ({ topic, partition, message }) => {
    logger.info('Received Event');

    const prefix = `${topic} [${partition} | ${message.offset}] / ${message.timestamp}\n`;
    logger.debug('Prefix:', prefix, message);

    const messageValue = message.value.toString();
    const payload = JSON.parse(messageValue);

    processEvent(payload);

  });
}

if (require.main == module) {
  app.listen(config['PORT'], _ => {
    logger.info(`HTTP Service started on port: ${config['PORT']}`);
  });

  startKafkaConsumer().catch(e => logger.error(`Error: ${e.message}`, e));
}

process.on('SIGINT', function() {
  process.exit();
});

module.exports = {
  app
};

'use strict';

require('dotenv').config();

const config = {
  // Application configuration
  PORT:       process.env.PORT || 3009,
  BASE_PATH:  '/api/v1',
  TIMESTAMP:  new Date().toTimeString(),

  // Kafka configuration
  KAFKA: {
    CLIENT_ID:  process.env.KAFKA_CLIENT_ID || 'default',
    GROUP_ID:   process.env.KAFKA_GROUP_ID || 'kafka-consumer',
    BROKERS:    process.env.KAFKA_BROKERS && process.env.KAFKA_BROKERS.split(","), // As brokers are expected in array
    USERNAME:   process.env.KAFKA_USERNAME,
    PASSWORD:   process.env.KAFKA_PASSWORD,
    TOPIC:      process.env.KAFKA_TOPIC,
  }
};


module.exports = config;

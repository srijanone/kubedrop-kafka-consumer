# KubeDrop Kafka Consumer

A Reactive Microservice to listen kafka events and does processing

---

### Pre-requisite

Create a file `.env` with appropriate ENV. VARIABLES Values. Application reads this value while bootstrapping. Use `.env.example` file for reference

```shell
# Application Config
NODE_ENV="development"

# Kafka Related Config
KAFKA_CLIENT_ID="unique-client-id"
KAFKA_GROUP_ID="kafka-consumer"
KAFKA_BROKERS="localhost:9092"
KAFKA_USERNAME=""
KAFKA_PASSWORD=""
KAFKA_TOPIC="article.created"
```

---

## Running

### Run without Docker

- `npm install` OR `yarn`
- `node src/app.js`

### Run with Docker

- `docker build -t kafka-consumer .`
- `docker run -p 3009:3009 --env-file=".env" kafka-consumer`

---

## Push image to registry

- `docker build -t kubedrop/kafka-consumer .`
- `docker login`
- `docker push kubedrop/kafka-consumer`
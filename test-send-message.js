#!/usr/bin/env node

const config = require('./src/config');
const { KafkaService } = require('./src/services');

const main = async () => {
    const topic = config.KAFKA.TOPIC;

    console.log('[+] Sending Message');

    const kafkaService = new KafkaService();

    const message = {
        test: 'test data'
    };
    await kafkaService.sendMessage(topic, message);

    console.log(`[+] Message Sent to topic: ${topic}`);
};

if (require.main === module) {
    main().catch(e => console.error(`[-] Error: ${e.message}`, e));
}
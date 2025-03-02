import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: 'chat-app',
    brokers: ['localhost:9092'],
  });

  private readonly producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: object) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}

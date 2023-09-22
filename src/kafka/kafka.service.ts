import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopic,
  Kafka,
  KafkaConfig,
  Producer,
  ProducerRecord,
} from 'kafkajs';
import { KAFKA_MODULE_CONFIG } from './kafka.constants';

@Injectable()
export class KafkaService
  extends Kafka
  implements OnModuleInit, OnApplicationShutdown
{
  private producerInstante: Producer;
  private readonly consumers: Consumer[] = [];

  constructor(
    @Inject(KAFKA_MODULE_CONFIG)
    private kafkaConfig: KafkaConfig,
  ) {
    super(kafkaConfig);
    this.producerInstante = super.producer();
  }

  async sendPayload(payload: ProducerRecord) {
    // try {
    const response = await this.producerInstante.send(payload);

    // } catch(error) {
    //   console.log('error')
    // }
  }

  async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer = this.consumer({ groupId: 'payments' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onModuleInit() {
    await this.producerInstante.connect();
  }
  async onApplicationShutdown() {
    await this.producerInstante.disconnect();
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}

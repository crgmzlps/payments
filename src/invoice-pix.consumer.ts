import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class InvoicePixConsumer implements OnModuleInit {
  private logger = new Logger(InvoicePixConsumer.name);
  constructor(private readonly kafkaService: KafkaService) {
    this.logger.log('Consumer criado');
  }
  async onModuleInit() {
    await this.kafkaService.consume(
      { topic: 'CreateInvoicePix' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          // usar starkbank service e criar o codigo pix  publicar no outro topico
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });

          this.kafkaService.sendPayload({
            topic: 'InvoicePixCodeReceived',
            messages: [{ value: 'json do codigo do pix' }],
          });
        },
      },
    );
  }
}

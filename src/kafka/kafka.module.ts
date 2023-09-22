import {
  DynamicModule,
  FactoryProvider,
  Global,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import { KafkaConfig } from 'kafkajs';
import { KAFKA_MODULE_CONFIG } from './kafka.constants';
import { KafkaService } from './kafka.service';

type KafkaAsyncModuleOptions = {
  useFactory: (...args: any[]) => Promise<KafkaConfig> | KafkaConfig;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Global()
@Module({})
export class KafkaModule {
  static register(kafkaConfig: KafkaConfig): DynamicModule {
    return {
      module: KafkaModule,
      providers: [
        {
          provide: KAFKA_MODULE_CONFIG,
          useValue: kafkaConfig,
        },
        KafkaService,
      ],
      exports: [KafkaService],
    };
  }
  static registerAsync({
    useFactory,
    imports,
    inject,
  }: KafkaAsyncModuleOptions): Promise<DynamicModule> | DynamicModule {
    const provider: Provider = {
      provide: KAFKA_MODULE_CONFIG,
      useFactory: async (...args) => {
        const cfg = await useFactory(...args);
        return cfg;
      },
      inject,
    };
    return {
      module: KafkaModule,
      imports,
      providers: [provider, KafkaService],
      exports: [KafkaService],
    };
  }
}

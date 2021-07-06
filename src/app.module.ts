import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StarkbankModule } from './starkbank/Starkbank.module';
import * as ormconfig from '../ormconfig';
import { Invoice } from './domain/entities/Invoice';
import { Boleto } from './domain/entities/Boleto';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Invoice, Boleto]),
    StarkbankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

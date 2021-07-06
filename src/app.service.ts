import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './domain/entities/Invoice';
import { Boleto } from './domain/entities/Boleto';
import { StarkbankService } from './starkbank/Starkbank.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Boleto)
    private boletoRepository: Repository<Boleto>,
    private starkbankService: StarkbankService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createInvoice(payload) {
    const invoice = new Invoice();
    invoice.merge(payload);
    await this.invoiceRepository.save(invoice);
    const dto = invoice.createDTO();
    const providerPayload = await this.starkbankService.createInvoice(dto);
    invoice.setProvider(providerPayload);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }

  async createBoleto(payload) {
    const boleto = new Boleto();
    boleto.merge(payload);
    await this.boletoRepository.save(boleto);
    const dto = boleto.createDTO();
    const providerPayload = await this.starkbankService.createBoleto(dto);
    boleto.setProvider(providerPayload);
    await this.boletoRepository.save(boleto);
    return boleto;
  }
}

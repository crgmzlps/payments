import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Invoice } from './domain/entities/Invoice';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('invoice')
  async createInvoice(@Request() req: Request): Promise<Invoice> {
    const createdBy = 'Rest API';
    const payload = {
      createdBy,
      lastChangedBy: createdBy,
      ...req.body,
    };
    return this.appService.createInvoice(payload);
  }

  @Post('boletos')
  async createBoleto(@Request() req: Request): Promise<Invoice> {
    const createdBy = 'Rest API';
    const payload = {
      createdBy,
      lastChangedBy: createdBy,
      ...req.body,
    };
    return this.appService.createBoleto(payload);
  }
}

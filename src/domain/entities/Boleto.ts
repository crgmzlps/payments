import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'boletos' })
export class Boleto extends BaseEntity {
  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  taxId: string;

  @Column({ nullable: true })
  due: string;

  @Column({ nullable: true })
  fine: number;

  @Column({ nullable: true })
  interest: number;

  @Column({ nullable: true })
  overdue_limit: number;

  @Column({ nullable: false })
  street_line_1: string;

  @Column({ nullable: false })
  street_line_2: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state_code: string;

  @Column({ nullable: false })
  zip_code: string;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'json', nullable: true })
  discounts: Discount[];

  @Column({ nullable: true })
  providerId: string;

  @Column({ default: false })
  status: string;

  @Column({ type: 'json', nullable: true })
  providerPayload: JSON;

  @Column()
  orderId: number;

  createDTO = () => {
    return {
      amount: this.amount,
      taxId: this.taxId,
      name: this.name,
      streetLine1: this.street_line_1,
      streetLine2: this.street_line_2,
      district: this.district,
      city: this.city,
      stateCode: this.state_code,
      zipCode: this.zip_code,
    };
  };

  setProvider = (providerPayload) => {
    const item = providerPayload[0];
    this.providerId = item.id;
    this.status = item.status;
    this.providerPayload = item;
  };
}

class Discount {
  percentage: number;
  date: Date;
}

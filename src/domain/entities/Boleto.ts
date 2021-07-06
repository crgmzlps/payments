import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'invoices' })
export class Invoice extends BaseEntity {
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
}

class Discount {
  percentage: number;
  date: Date;
}

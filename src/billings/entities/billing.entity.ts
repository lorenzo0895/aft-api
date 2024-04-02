import { floatParser } from "src/shared/constants/parseFloat";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  date: Date;
  @Column({ type: 'date' })
  dateFrom: Date;
  @Column({ type: 'date' })
  dateTo: Date;
  @Column({ type: 'date' })
  datePayment: Date;
  @Column()
  salePoint: number;
  @Column()
  cuit: string;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
    transformer: floatParser,
  })
  net: number;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
    transformer: floatParser,
  })
  vat: number;
}

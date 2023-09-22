import { Receipt } from 'src/receipts/entities/receipt.entity';
import { floatParser } from 'src/shared/constants/parseFloat';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cheque {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  number: string;
  @Column()
  date: Date;
  @Column({ nullable: true })
  bank: string;
  @Column({ nullable: true })
  branchOffice: string;
  @Column({ nullable: true })
  cuit: string;
  @ManyToOne(() => Receipt, (receipt) => receipt.cheques)
  receipt: Receipt;
  @ManyToOne(() => Receipt, (receipt) => receipt.cheques)
  cancelReceipt: Receipt;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    transformer: floatParser,
  })
  amount: number;
}

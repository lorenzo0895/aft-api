import { Cheque } from 'src/cheques/entities/cheque.entity';
import { Client } from 'src/clients/entities/client.entity';
import { ConceptItem } from 'src/concept-items/entities/concept.entity';
import { Day } from 'src/days/entities/day.entity';
import { floatParser } from 'src/shared/constants/parseFloat';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  number: number;
  @ManyToOne(() => Day, (day) => day.receipts, { eager: true })
  day: Day;
  @ManyToOne(() => Client, (client) => client.receipts, { eager: true })
  client: Client; //ver
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    transformer: floatParser,
  })
  transferAmount: number;
  @Column({ nullable: true })
  description: string;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    transformer: floatParser,
  })
  cash: number;
  @OneToMany(() => Cheque, (cheque) => cheque.receipt, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  cheques: Cheque[];
  @OneToMany(() => Cheque, (cheque) => cheque.cancelReceipt, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  cancelCheques: Cheque[];
  @OneToMany(() => ConceptItem, (conceptItem) => conceptItem.receipt, {
    eager: true,
  })
  conceptItems: ConceptItem[];
  @ManyToOne(() => User, (user) => user.receipts, { eager: true })
  user: User;
  @ManyToOne(() => Receipt, (receipt) => receipt.id)
  cancelReceipt: Receipt;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isCancelled: boolean;
}

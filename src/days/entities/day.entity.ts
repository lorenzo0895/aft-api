import { Receipt } from 'src/receipts/entities/receipt.entity';
import { floatParser } from 'src/shared/constants/parseFloat';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'date' })
  day: Date;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
    transformer: floatParser,
  })
  totalAudited: number;
  @OneToMany(() => Receipt, (receipt) => receipt.day)
  receipts: Receipt[];
  @Column({ default: true })
  isActive: boolean;
}

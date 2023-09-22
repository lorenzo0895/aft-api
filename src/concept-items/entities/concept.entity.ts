import { Concept } from 'src/concepts/entities/concept.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { floatParser } from 'src/shared/constants/parseFloat';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConceptItem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Concept, (concept) => concept.conceptItems, {
    eager: true,
  })
  concept: Concept;
  @ManyToOne(() => Receipt, (receipt) => receipt.conceptItems)
  receipt: Receipt;
  @Column({
    type: 'decimal',
    precision: 14,
    scale: 2,
    transformer: floatParser,
  })
  amount: number;
  @Column({ nullable: true })
  description: string;
  @Column({ default: true })
  isActive: boolean;
}

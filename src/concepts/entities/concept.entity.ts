import { ConceptItem } from 'src/concept-items/entities/concept.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Concept {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  value: string;
  @Column()
  description: string;
  @OneToMany(() => ConceptItem, (conceptItem) => conceptItem.concept)
  conceptItems: ConceptItem[];
  @Column()
  isOwnFee: boolean;
  @Column({ default: true })
  isActive: boolean;
}

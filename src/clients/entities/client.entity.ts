import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  surname: string;
  @Column({ nullable: true })
  cuit: string;
  @Column({ nullable: true })
  location: string;
  @Column({ nullable: true })
  fiscalCondition: string;
  @Column({ nullable: true })
  phone: string;
  @OneToMany(() => Receipt, (receipt) => receipt.client)
  receipts: Receipt[];
  @Column({ default: true })
  isActive: boolean;
}

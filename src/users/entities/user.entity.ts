import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @OneToMany(() => Receipt, (receipt) => receipt.user)
  receipts: Receipt[];
  @Column()
  roles: string;
  @Column({ default: true })
  isActive: boolean;
}

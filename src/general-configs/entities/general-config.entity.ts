import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GeneralConfig {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  key: string;
  @Column()
  value: string;
}

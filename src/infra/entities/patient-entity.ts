import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export class PgPatient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;
  
  @Column()
  disease!: string;

  @Column()
  birthDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}
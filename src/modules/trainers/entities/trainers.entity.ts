import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trainers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cep: string;
}
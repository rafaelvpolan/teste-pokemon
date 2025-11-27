// trainers/entities/trainers.entity.ts
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { TeamTrainer } from '../../teams/entities/team-trainer.entity';

@Entity('trainers')
export class Trainers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToMany(() => TeamTrainer, teamTrainer => teamTrainer.trainer)
  teamTrainers: TeamTrainer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
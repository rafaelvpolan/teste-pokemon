
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { TeamTrainer } from './team-trainer.entity';

@Entity('teams')
export class Teams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => TeamTrainer, teamTrainer => teamTrainer.team)
  teamTrainers: TeamTrainer[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
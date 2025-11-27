// teams/entities/team-trainer.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  Unique
} from 'typeorm';
import { Teams } from './teams.entity';
import { Trainers } from '../../trainers/entities/trainers.entity';

@Entity('team_trainers')
@Unique(['team']) // Garante que um time tenha apenas 1 treinador
export class TeamTrainer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teams, team => team.teamTrainers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Teams;

  @ManyToOne(() => Trainers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainers;

  @CreateDateColumn()
  createdAt: Date;
}
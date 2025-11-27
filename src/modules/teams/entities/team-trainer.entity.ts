import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  Unique
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Teams } from './teams.entity';
import { Trainers } from '../../trainers/entities/trainers.entity';

@Entity('team_trainers')
@Unique(['team']) // Garante que um time tenha apenas 1 treinador
export class TeamTrainer {
  @ApiProperty({
    example: 1,
    description: 'ID único da associação entre time e treinador'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Time ao qual o treinador está associado',
    type: () => Teams
  })
  @ManyToOne(() => Teams, team => team.teamTrainers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Teams;

  @ApiProperty({
    description: 'Treinador associado ao time',
    type: () => Trainers
  })
  @ManyToOne(() => Trainers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trainer_id' })
  trainer: Trainers;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data em que o treinador foi associado ao time'
  })
  @CreateDateColumn()
  createdAt: Date;
}
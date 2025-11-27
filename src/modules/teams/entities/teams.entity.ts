// src/modules/teams/entities/team.entity.ts
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { TeamTrainer } from './team-trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Teams {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => TeamTrainer, teamTrainer => teamTrainer.team, { cascade: true })
  teamTrainers: TeamTrainer[];

  @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.team, { cascade: true })
  teamPokemons: TeamPokemon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
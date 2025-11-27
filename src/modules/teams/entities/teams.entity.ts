import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TeamTrainer } from './team-trainer.entity';
import { TeamPokemon } from './team-pokemon.entity';

@Entity('teams')
export class Teams {
  @ApiProperty({
    example: 1,
    description: 'ID único do time'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Team Rocket',
    description: 'Nome do time'
  })
  @Column()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Status do time (ativo/inativo)',
    default: true
  })
  @Column({ default: true })
  status: boolean;

  @ApiProperty({
    description: 'Treinador associado ao time (máximo 1)',
    type: () => TeamTrainer,
    isArray: true
  })
  @OneToMany(() => TeamTrainer, teamTrainer => teamTrainer.team, { cascade: true })
  teamTrainers: TeamTrainer[];

  @ApiProperty({
    description: 'Pokémons do time (máximo 5)',
    type: () => TeamPokemon,
    isArray: true
  })
  @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.team, { cascade: true })
  teamPokemons: TeamPokemon[];

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de criação do time'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'Data da última atualização do time'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
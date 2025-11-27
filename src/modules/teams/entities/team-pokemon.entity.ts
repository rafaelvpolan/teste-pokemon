import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  Unique,
  Column
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Teams } from './teams.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity('team_pokemons')
@Unique(['team', 'pokemon']) // Impede duplicação do mesmo Pokémon no time
export class TeamPokemon {
  @ApiProperty({
    example: 1,
    description: 'ID único da associação entre time e Pokémon'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Time ao qual o Pokémon pertence',
    type: () => Teams
  })
  @ManyToOne(() => Teams, team => team.teamPokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Teams;

  @ApiProperty({
    description: 'Pokémon associado ao time',
    type: () => Pokemon
  })
  @ManyToOne(() => Pokemon, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;

  @ApiProperty({
    example: 1,
    description: 'Posição do Pokémon no time (1-5)',
    minimum: 1,
    maximum: 5
  })
  @Column({ default: 1 })
  position: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data em que o Pokémon foi adicionado ao time'
  })
  @CreateDateColumn()
  addedAt: Date;
}
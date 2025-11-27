// src/modules/teams/entities/team-pokemon.entity.ts
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  JoinColumn,
  CreateDateColumn,
  Unique,
  Column
} from 'typeorm';
import { Teams } from './teams.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity('team_pokemons')
@Unique(['team', 'pokemon']) // Impede duplicação do mesmo Pokémon no time
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teams, team => team.teamPokemons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Teams;

  @ManyToOne(() => Pokemon, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'pokemon_id' })
  pokemon: Pokemon;

  @Column({ default: 1 })
  position: number; // Posição no time (1-5)

  @CreateDateColumn()
  addedAt: Date;
}
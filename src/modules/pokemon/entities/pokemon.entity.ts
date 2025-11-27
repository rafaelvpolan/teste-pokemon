// src/modules/pokemon/entities/pokemon.entity.ts
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { TeamPokemon } from '../../teams/entities/team-pokemon.entity';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  pokedex_number: number;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({ nullable: true })
  base_experience: number;

  @Column({ nullable: true })
  sprite_front: string;

  @Column({ nullable: true })
  sprite_back: string;

  @Column('simple-array')
  types: string[];

  @Column('simple-array')
  abilities: string[];

  @Column('json', { nullable: true })
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };

  @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.pokemon)
  teamPokemons: TeamPokemon[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
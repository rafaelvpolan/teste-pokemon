// pokemon.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TeamPokemon } from '../../teams/entities/team-pokemon.entity';

@Entity('pokemons')
export class Pokemon {
  @ApiProperty({ 
    example: 1, 
    description: 'ID único do Pokémon no banco de dados' 
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    example: 'pikachu', 
    description: 'Nome do Pokémon' 
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ 
    example: 25, 
    description: 'Número do Pokémon na Pokédex' 
  })
  @Column()
  pokedex_number: number;

  @ApiProperty({ 
    example: 4, 
    description: 'Altura do Pokémon em decímetros' 
  })
  @Column()
  height: number;

  @ApiProperty({ 
    example: 60, 
    description: 'Peso do Pokémon em hectogramas' 
  })
  @Column()
  weight: number;

  @ApiProperty({ 
    example: 112, 
    description: 'Experiência base do Pokémon',
    required: false 
  })
  @Column({ nullable: true })
  base_experience: number;

  @ApiProperty({ 
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 
    description: 'URL do sprite frontal do Pokémon',
    required: false 
  })
  @Column({ nullable: true })
  sprite_front: string;

  @ApiProperty({ 
    example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png', 
    description: 'URL do sprite traseiro do Pokémon',
    required: false 
  })
  @Column({ nullable: true })
  sprite_back: string;

  @ApiProperty({ 
    example: ['electric'], 
    description: 'Lista de tipos do Pokémon',
    type: [String]
  })
  @Column('simple-array')
  types: string[];

  @ApiProperty({ 
    example: ['static', 'lightning-rod'], 
    description: 'Lista de habilidades do Pokémon',
    type: [String]
  })
  @Column('simple-array')
  abilities: string[];

  @ApiProperty({ 
    example: {
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 50,
      special_defense: 50,
      speed: 90
    }, 
    description: 'Estatísticas base do Pokémon',
    required: false
  })
  @Column('json', { nullable: true })
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };

  @ApiProperty({ 
    description: 'Times que possuem este Pokémon',
    type: () => TeamPokemon,
    isArray: true
  })
  @OneToMany(() => TeamPokemon, teamPokemon => teamPokemon.pokemon)
  teamPokemons: TeamPokemon[];

  @ApiProperty({ 
    example: '2024-01-01T00:00:00.000Z', 
    description: 'Data de criação do registro' 
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ 
    example: '2024-01-01T12:00:00.000Z', 
    description: 'Data da última atualização do registro' 
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
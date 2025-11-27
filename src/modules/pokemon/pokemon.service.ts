import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiService } from '../external_apis/pokeapi/pokeapi.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  // Buscar no banco ou na API e salvar
  async findOrCreate(nameOrId: string | number): Promise<Pokemon> {
    // Tentar buscar no banco primeiro
    const pokemonInDb = await this.pokemonRepository.findOne({
      where: typeof nameOrId === 'string' 
        ? { name: nameOrId.toLowerCase() }
        : { pokedex_number: nameOrId }
    });

    if (pokemonInDb) {
      return pokemonInDb;
    }

    // Se não existir no banco, buscar na API
    const pokemonFromApi = await this.pokeApiService.getPokemon(nameOrId);

    if (!pokemonFromApi) {
      throw new NotFoundException(
        `Pokémon ${nameOrId} não encontrado na API`
      );
    }

    // Salvar no banco
    return await this.savePokemonFromApi(pokemonFromApi);
  }

  // Salvar Pokémon da API no banco
  private async savePokemonFromApi(apiData: any): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create({
      name: apiData.name,
      pokedex_number: apiData.id,
      height: apiData.height,
      weight: apiData.weight,
      base_experience: apiData.base_experience,
      sprite_front: apiData.sprites.front_default,
      sprite_back: apiData.sprites.back_default,
      types: apiData.types.map((t: any) => t.type.name),
      abilities: apiData.abilities.map((a: any) => a.ability.name),
      stats: {
        hp: apiData.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
        attack: apiData.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
        defense: apiData.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
        special_attack: apiData.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
        special_defense: apiData.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
        speed: apiData.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0,
      },
    });

    return await this.pokemonRepository.save(pokemon);
  }

  // Listar todos do Banco
  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  // BUscar por ID no banco
  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    
    if (!pokemon) {
      throw new NotFoundException(`Pokémon com ID ${id} não encontrado no banco`);
    }
    
    return pokemon;
  }

  // Buscar por nome no banco
  async findByName(name: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ 
      where: { name: name.toLowerCase() } 
    });
    
    if (!pokemon) {
      throw new NotFoundException(`Pokémon ${name} não encontrado no banco`);
    }
    
    return pokemon;
  }

  // Deletar do banco
  async remove(id: number): Promise<void> {
    const pokemon = await this.findOne(id);
    await this.pokemonRepository.remove(pokemon);
  }

  // Buscar por tipo
  async findByType(type: string): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository
      .createQueryBuilder('pokemon')
      .where('pokemon.types LIKE :type', { type: `%${type}%` })
      .getMany();

    return pokemons;
  }

  // Importar múltiplos Pokémons da API
  async importFromApi(limit: number = 20): Promise<Pokemon[]> {
    const { results } = await this.pokeApiService.listPokemons(limit, 0);
    
    const pokemons: Pokemon[] = [];
    
    for (const result of results) {
      try {
        const pokemon = await this.findOrCreate(result.name);
        pokemons.push(pokemon);
      } catch (error) {
        console.error(`Erro ao importar ${result.name}:`, error.message);
      }
    }
    
    return pokemons;
  }
}
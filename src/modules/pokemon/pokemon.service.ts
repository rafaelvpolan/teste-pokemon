// pokemon.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiService } from '../external_apis/pokeapi/pokeapi.service';

/**
 * Serviço responsável pela gestão de Pokémons
 * Integra dados do banco local com a PokeAPI
 */
@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private readonly pokeApiService: PokeApiService,
  ) {}

  /**
   * Busca um Pokémon no banco de dados ou na PokeAPI
   * Se não existir no banco, busca na API e salva automaticamente
   * @param nameOrId - Nome do Pokémon (string) ou número da Pokédex (number)
   * @returns Pokémon encontrado ou criado
   * @throws NotFoundException se o Pokémon não for encontrado na API
   */
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

  /**
   * Converte dados da PokeAPI para o formato do banco e salva
   * @param apiData - Dados retornados pela PokeAPI
   * @returns Pokémon salvo no banco
   * @private
   */
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

  /**
   * Lista todos os Pokémons salvos no banco de dados
   * @returns Array de Pokémons
   */
  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  /**
   * Busca um Pokémon por ID no banco de dados
   * @param id - ID do Pokémon no banco
   * @returns Pokémon encontrado
   * @throws NotFoundException se o Pokémon não existir
   */
  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    
    if (!pokemon) {
      throw new NotFoundException(`Pokémon com ID ${id} não encontrado no banco`);
    }
    
    return pokemon;
  }

  /**
   * Busca um Pokémon por nome no banco de dados
   * @param name - Nome do Pokémon
   * @returns Pokémon encontrado
   * @throws NotFoundException se o Pokémon não existir
   */
  async findByName(name: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ 
      where: { name: name.toLowerCase() } 
    });
    
    if (!pokemon) {
      throw new NotFoundException(`Pokémon ${name} não encontrado no banco`);
    }
    
    return pokemon;
  }

  /**
   * Remove um Pokémon do banco de dados
   * Só é possível deletar se não estiver associado a nenhum time (RESTRICT)
   * @param id - ID do Pokémon
   * @throws NotFoundException se o Pokémon não existir
   */
  async remove(id: number): Promise<void> {
    const pokemon = await this.findOne(id);
    await this.pokemonRepository.remove(pokemon);
  }

  /**
   * Busca Pokémons por tipo
   * @param type - Tipo do Pokémon (ex: fire, water, electric)
   * @returns Array de Pokémons do tipo especificado
   */
  async findByType(type: string): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository
      .createQueryBuilder('pokemon')
      .where('pokemon.types LIKE :type', { type: `%${type}%` })
      .getMany();

    return pokemons;
  }

  /**
   * Importa múltiplos Pokémons da PokeAPI em lote
   * @param limit - Quantidade de Pokémons a importar (padrão: 20)
   * @returns Array de Pokémons importados
   */
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
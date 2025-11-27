// src/modules/external_apis/pokeapi/pokeapi.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokemonApiResponse, PaginatedResponse } from '../../pokemon/interfaces/pokemon-response.interface';

@Injectable()
export class PokeApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private readonly httpService: HttpService) {}

  async getPokemon(nameOrId: string | number): Promise<PokemonApiResponse | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PokemonApiResponse>(
          `${this.baseUrl}/pokemon/${nameOrId}`
        )
      );
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new HttpException(
        'Erro ao buscar Pokémon na API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async listPokemons(limit: number = 20, offset: number = 0): Promise<PaginatedResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PaginatedResponse>(
          `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
        )
      );
      return data;
    } catch (error) {
      throw new HttpException(
        'Erro ao listar Pokémons',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
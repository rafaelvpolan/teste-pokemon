import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class AddPokemonDto {
  @IsNumber()
  pokemonId: number;
}
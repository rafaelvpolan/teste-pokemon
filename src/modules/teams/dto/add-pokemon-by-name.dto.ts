import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class AddPokemonByNameDto {
  @IsString()
  pokemonName: string;
}
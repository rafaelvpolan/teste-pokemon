import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddPokemonByNameDto {
  @ApiProperty({
    description: 'Nome do Pokémon a ser adicionado ao time',
    example: 'pikachu',
  })
  @IsString()
  pokemonName: string;
}
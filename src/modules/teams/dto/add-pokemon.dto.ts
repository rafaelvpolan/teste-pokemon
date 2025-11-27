import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddPokemonDto {
  @ApiProperty({
    description: 'ID do Pokémon no banco de dados',
    example: 25,
  })
  @IsNumber()
  pokemonId: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'Nome do treinador',
    example: 'Ash Ketchum',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CEP do endereço do treinador (formato: 00000-000)',
    example: '01310-100',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}-?\d{3}$/, {
    message: 'CEP deve estar no formato 00000-000 ou 00000000',
  })
  cep: string;

  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Avenida Paulista',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Bela Vista',
  })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    description: 'Cidade do endereço',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Estado do endereço (sigla com 2 letras)',
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, {
    message: 'Estado deve ter 2 caracteres',
  })
  state: string;
}
// pokemon.controller.ts

import { 
  Controller, 
  Get, 
  Delete, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam 
} from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os Pokémons',
    description: 'Retorna todos os Pokémons salvos no banco de dados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de Pokémons retornada com sucesso',
    type: [Pokemon]
  })
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get('search/:nameOrId')
  @ApiOperation({ 
    summary: 'Buscar Pokémon por nome ou número da Pokédex',
    description: 'Busca o Pokémon no banco de dados. Se não existir, busca na PokeAPI e salva automaticamente'
  })
  @ApiParam({ 
    name: 'nameOrId', 
    description: 'Nome do Pokémon (ex: pikachu) ou número da Pokédex (ex: 25)',
    example: 'pikachu'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pokémon encontrado ou criado com sucesso',
    type: Pokemon
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pokémon não encontrado na PokeAPI'
  })
  findOrCreate(@Param('nameOrId') nameOrId: string): Promise<Pokemon> {
    const param = isNaN(Number(nameOrId)) ? nameOrId : Number(nameOrId);
    return this.pokemonService.findOrCreate(param);
  }

  @Get('type/:type')
  @ApiOperation({ 
    summary: 'Buscar Pokémons por tipo',
    description: 'Retorna todos os Pokémons de um tipo específico salvos no banco'
  })
  @ApiParam({ 
    name: 'type', 
    description: 'Tipo do Pokémon (ex: fire, water, electric, grass)',
    example: 'electric'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de Pokémons do tipo especificado',
    type: [Pokemon]
  })
  findByType(@Param('type') type: string): Promise<Pokemon[]> {
    return this.pokemonService.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar Pokémon por ID',
    description: 'Retorna um Pokémon específico pelo ID do banco de dados'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do Pokémon no banco de dados',
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pokémon encontrado com sucesso',
    type: Pokemon
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pokémon não encontrado no banco de dados'
  })
  findOne(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Deletar Pokémon',
    description: 'Remove um Pokémon do banco de dados. Só é possível deletar se o Pokémon não estiver associado a nenhum time'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do Pokémon no banco de dados',
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Pokémon deletado com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pokémon não encontrado'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Não é possível deletar. Pokémon está associado a um ou mais times'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.pokemonService.remove(+id);
  }
}
import { 
  Controller, 
  Get, 
  Delete, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // GET /pokemon - Listar todos do banco
  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  // GET /pokemon/search/:nameOrId - Buscar no banco ou API e salvar
  @Get('search/:nameOrId')
  findOrCreate(@Param('nameOrId') nameOrId: string): Promise<Pokemon> {
    // Se for número, converter
    const param = isNaN(Number(nameOrId)) ? nameOrId : Number(nameOrId);
    return this.pokemonService.findOrCreate(param);
  }

  // GET /pokemon/type/:type - Buscar por tipo
  @Get('type/:type')
  findByType(@Param('type') type: string): Promise<Pokemon[]> {
    return this.pokemonService.findByType(type);
  }

  // GET /pokemon/:id - Buscar por ID no banco
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  // DELETE /pokemon/:id - Deletar do banco
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.pokemonService.remove(+id);
  }
}
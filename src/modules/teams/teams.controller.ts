import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  Patch
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssignTrainerDto } from './dto/assign-trainer.dto';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { AddPokemonByNameDto } from './dto/add-pokemon-by-name.dto';
import { Teams } from './entities/teams.entity';
import { TeamTrainer } from './entities/team-trainer.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Trainers } from '../trainers/entities/trainers.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // ========== TEAM CRUD ==========

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Criar um novo time',
    description: 'Cria um novo time com nome e status'
  })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Time criado com sucesso',
    type: Teams
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos' 
  })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os times',
    description: 'Retorna todos os times com seus treinadores e Pokémons'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de times retornada com sucesso',
    type: [Teams]
  })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar time por ID',
    description: 'Retorna um time específico com suas relações'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Time encontrado com sucesso',
    type: Teams
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado' 
  })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Get(':id/details')
  @ApiOperation({ 
    summary: 'Buscar detalhes completos do time',
    description: 'Retorna informações detalhadas do time incluindo treinador e Pokémons formatados'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Detalhes do time retornados com sucesso'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado' 
  })
  getTeamDetails(@Param('id') id: string) {
    return this.teamsService.getTeamDetails(+id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Atualizar time',
    description: 'Atualiza nome e/ou status do time'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Time atualizado com sucesso',
    type: Teams
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado' 
  })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Deletar time',
    description: 'Remove o time e todas as suas associações (treinador e Pokémons) em cascata'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Time deletado com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado' 
  })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  // ========== TRAINER ENDPOINTS ==========

  @Post(':id/trainer')
  @ApiOperation({ 
    summary: 'Associar treinador ao time',
    description: 'Associa um treinador ao time. Um time pode ter apenas 1 treinador'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiBody({ type: AssignTrainerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Treinador associado com sucesso',
    type: TeamTrainer
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time ou treinador não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Time já possui um treinador associado' 
  })
  assignTrainer(
    @Param('id') id: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ) {
    return this.teamsService.assignTrainer(+id, assignTrainerDto.trainerId);
  }

  @Delete(':id/trainer')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Remover treinador do time',
    description: 'Remove a associação entre o time e seu treinador'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Treinador removido com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Associação não encontrada' 
  })
  removeTrainer(@Param('id') id: string) {
    return this.teamsService.removeTrainer(+id);
  }

  @Get(':id/trainer')
  @ApiOperation({ 
    summary: 'Buscar treinador do time',
    description: 'Retorna o treinador associado ao time'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Treinador encontrado',
    type: Trainers
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado ou não possui treinador' 
  })
  getTrainerByTeam(@Param('id') id: string) {
    return this.teamsService.getTrainerByTeam(+id);
  }

  @Get('trainer/:trainerId')
  @ApiOperation({ 
    summary: 'Buscar times de um treinador',
    description: 'Retorna todos os times associados a um treinador específico'
  })
  @ApiParam({ 
    name: 'trainerId', 
    description: 'ID do treinador', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de times do treinador',
    type: [Teams]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Treinador não encontrado' 
  })
  getTeamsByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamsService.getTeamsByTrainer(+trainerId);
  }

  // ========== POKEMON ENDPOINTS ==========

  @Post(':id/pokemon')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Adicionar Pokémon ao time por ID',
    description: 'Adiciona um Pokémon existente no banco ao time. Máximo de 5 Pokémons por time'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiBody({ type: AddPokemonDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Pokémon adicionado com sucesso',
    type: TeamPokemon
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Time já possui o máximo de 5 Pokémons' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time ou Pokémon não encontrado' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Pokémon já está no time' 
  })
  addPokemon(
    @Param('id') id: string,
    @Body() addPokemonDto: AddPokemonDto,
  ) {
    return this.teamsService.addPokemon(
      +id, 
      addPokemonDto.pokemonId
    );
  }

  @Post(':id/pokemon/search')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Adicionar Pokémon ao time por nome',
    description: 'Busca o Pokémon no banco ou na PokeAPI (se não existir) e adiciona ao time. Máximo de 5 Pokémons por time'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiBody({ type: AddPokemonByNameDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Pokémon adicionado com sucesso',
    type: TeamPokemon
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Time já possui o máximo de 5 Pokémons' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado ou Pokémon não encontrado na PokeAPI' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Pokémon já está no time' 
  })
  addPokemonByName(
    @Param('id') id: string,
    @Body() addPokemonByNameDto: AddPokemonByNameDto,
  ) {
    return this.teamsService.addPokemonByName(
      +id, 
      addPokemonByNameDto.pokemonName
    );
  }

  @Get(':id/pokemon')
  @ApiOperation({ 
    summary: 'Listar Pokémons do time',
    description: 'Retorna todos os Pokémons associados ao time ordenados por posição'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de Pokémons do time',
    type: [Pokemon]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Time não encontrado' 
  })
  getPokemonsByTeam(@Param('id') id: string) {
    return this.teamsService.getPokemonsByTeam(+id);
  }

  @Delete(':id/pokemon/:pokemonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Remover Pokémon do time',
    description: 'Remove a associação entre o time e o Pokémon'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do time', 
    example: 1,
    type: Number
  })
  @ApiParam({ 
    name: 'pokemonId', 
    description: 'ID do Pokémon', 
    example: 25,
    type: Number
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Pokémon removido com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Associação não encontrada' 
  })
  removePokemon(
    @Param('id') id: string,
    @Param('pokemonId') pokemonId: string,
  ) {
    return this.teamsService.removePokemon(+id, +pokemonId);
  }

  @Get('pokemon/:pokemonId')
  @ApiOperation({ 
    summary: 'Listar times que possuem um Pokémon',
    description: 'Retorna todos os times que possuem um Pokémon específico'
  })
  @ApiParam({ 
    name: 'pokemonId', 
    description: 'ID do Pokémon', 
    example: 25,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de times que possuem o Pokémon',
    type: [Teams]
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Pokémon não encontrado' 
  })
  getTeamsByPokemon(@Param('pokemonId') pokemonId: string) {
    return this.teamsService.getTeamsByPokemon(+pokemonId);
  }
}
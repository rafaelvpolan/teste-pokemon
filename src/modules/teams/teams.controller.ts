// src/modules/teams/teams.controller.ts
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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssignTrainerDto } from './dto/assign-trainer.dto';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { AddPokemonByNameDto } from './dto/add-pokemon-by-name.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // ========== TEAM CRUD ==========

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Get(':id/details')
  getTeamDetails(@Param('id') id: string) {
    return this.teamsService.getTeamDetails(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  // ========== TRAINER ENDPOINTS ==========

  @Post(':id/trainer')
  assignTrainer(
    @Param('id') id: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ) {
    return this.teamsService.assignTrainer(+id, assignTrainerDto.trainerId);
  }

  @Delete(':id/trainer')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrainer(@Param('id') id: string) {
    return this.teamsService.removeTrainer(+id);
  }

  @Get(':id/trainer')
  getTrainerByTeam(@Param('id') id: string) {
    return this.teamsService.getTrainerByTeam(+id);
  }

  @Get('trainer/:trainerId')
  getTeamsByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamsService.getTeamsByTrainer(+trainerId);
  }

  // ========== POKEMON ENDPOINTS ==========

  // Adicionar Pokémon por ID
  @Post(':id/pokemon')
  @HttpCode(HttpStatus.CREATED)
  addPokemon(
    @Param('id') id: string,
    @Body() addPokemonDto: AddPokemonDto,
  ) {
    return this.teamsService.addPokemon(
      +id, 
      addPokemonDto.pokemonId
    );
  }

  // Adicionar Pokémon por nome (busca na API se não existir)
  @Post(':id/pokemon/search')
  @HttpCode(HttpStatus.CREATED)
  addPokemonByName(
    @Param('id') id: string,
    @Body() addPokemonByNameDto: AddPokemonByNameDto,
  ) {
    return this.teamsService.addPokemonByName(
      +id, 
      addPokemonByNameDto.pokemonName
    );
  }

  // Listar Pokémons do time
  @Get(':id/pokemon')
  getPokemonsByTeam(@Param('id') id: string) {
    return this.teamsService.getPokemonsByTeam(+id);
  }

  // Remover Pokémon do time
  @Delete(':id/pokemon/:pokemonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removePokemon(
    @Param('id') id: string,
    @Param('pokemonId') pokemonId: string,
  ) {
    return this.teamsService.removePokemon(+id, +pokemonId);
  }

 
  // Listar times que possuem um Pokémon específico
  @Get('pokemon/:pokemonId')
  getTeamsByPokemon(@Param('pokemonId') pokemonId: string) {
    return this.teamsService.getTeamsByPokemon(+pokemonId);
  }
}
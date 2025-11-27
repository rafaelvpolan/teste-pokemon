// teams/teams.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AssignTrainerDto } from './dto/assign-trainer.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // POST /teams
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  // GET /teams
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // GET /teams/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  // PUT /teams/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  // DELETE /teams/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  // POST /teams/:id/trainer - Associar treinador ao time
  @Post(':id/trainer')
  assignTrainer(
    @Param('id') id: string,
    @Body() assignTrainerDto: AssignTrainerDto,
  ) {
    return this.teamsService.assignTrainer(+id, assignTrainerDto.trainerId);
  }

  // DELETE /teams/:id/trainer - Remover treinador do time
  @Delete(':id/trainer')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrainer(@Param('id') id: string) {
    return this.teamsService.removeTrainer(+id);
  }

  // GET /teams/:id/trainer - Buscar treinador do time
  @Get(':id/trainer')
  getTrainerByTeam(@Param('id') id: string) {
    return this.teamsService.getTrainerByTeam(+id);
  }

  // GET /teams/trainer/:trainerId - Buscar times de um treinador
  @Get('trainer/:trainerId')
  getTeamsByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamsService.getTeamsByTrainer(+trainerId);
  }
}
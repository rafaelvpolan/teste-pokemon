// teams/teams.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException,
  ConflictException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teams } from './entities/teams.entity';
import { TeamTrainer } from './entities/team-trainer.entity';
import { Trainers } from '../trainers/entities/trainers.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams)
    private teamsRepository: Repository<Teams>,
    
    @InjectRepository(TeamTrainer)
    private teamTrainersRepository: Repository<TeamTrainer>,
    
    @InjectRepository(Trainers)
    private trainersRepository: Repository<Trainers>,
  ) {}

  // CREATE
  async create(createTeamDto: CreateTeamDto): Promise<Teams> {
    const team = this.teamsRepository.create(createTeamDto);
    return await this.teamsRepository.save(team);
  }

  // READ ALL
  async findAll(): Promise<Teams[]> {
    return await this.teamsRepository.find({
      relations: ['teamTrainers', 'teamTrainers.trainer'],
    });
  }

  // READ ONE
  async findOne(id: number): Promise<Teams> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['teamTrainers', 'teamTrainers.trainer'],
    });
    
    if (!team) {
      throw new NotFoundException(`Team com ID ${id} não encontrado`);
    }
    
    return team;
  }

  // UPDATE
  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Teams> {
    const team = await this.findOne(id);
    Object.assign(team, updateTeamDto);
    return await this.teamsRepository.save(team);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const team = await this.findOne(id);
    await this.teamsRepository.remove(team);
  }

  // ASSIGN TRAINER TO TEAM
  async assignTrainer(teamId: number, trainerId: number): Promise<TeamTrainer> {
    // Verificar se o time existe
    const team = await this.findOne(teamId);
    
    // Verificar se o treinador existe
    const trainer = await this.trainersRepository.findOne({ 
      where: { id: trainerId } 
    });
    
    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${trainerId} não encontrado`);
    }

    // Verificar se o time já tem um treinador
    const existingAssignment = await this.teamTrainersRepository.findOne({
      where: { team: { id: teamId } },
    });

    if (existingAssignment) {
      throw new ConflictException(
        `O time ${team.name} já possui um treinador associado`
      );
    }

    // Criar a associação
    const teamTrainer = this.teamTrainersRepository.create({
      team,
      trainer,
    });

    return await this.teamTrainersRepository.save(teamTrainer);
  }

  // REMOVE TRAINER FROM TEAM
  async removeTrainer(teamId: number): Promise<void> {
    const assignment = await this.teamTrainersRepository.findOne({
      where: { team: { id: teamId } },
    });

    if (!assignment) {
      throw new NotFoundException(
        `Nenhum treinador associado ao time ${teamId}`
      );
    }

    await this.teamTrainersRepository.remove(assignment);
  }

  // GET TEAMS BY TRAINER
  async getTeamsByTrainer(trainerId: number): Promise<Teams[]> {
    const trainer = await this.trainersRepository.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${trainerId} não encontrado`);
    }

    const teamTrainers = await this.teamTrainersRepository.find({
      where: { trainer: { id: trainerId } },
      relations: ['team'],
    });

    return teamTrainers.map(tt => tt.team);
  }

  // GET TRAINER BY TEAM
  async getTrainerByTeam(teamId: number): Promise<Trainers | null> {
    const teamTrainer = await this.teamTrainersRepository.findOne({
      where: { team: { id: teamId } },
      relations: ['trainer'],
    });

    return teamTrainer ? teamTrainer.trainer : null;
  }
}
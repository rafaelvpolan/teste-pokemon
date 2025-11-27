// src/modules/teams/teams.service.ts
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
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Trainers } from '../trainers/entities/trainers.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams)
    private teamsRepository: Repository<Teams>,
    
    @InjectRepository(TeamTrainer)
    private teamTrainersRepository: Repository<TeamTrainer>,
    
    @InjectRepository(TeamPokemon)
    private teamPokemonsRepository: Repository<TeamPokemon>,
    
    @InjectRepository(Trainers)
    private trainersRepository: Repository<Trainers>,
    
    @InjectRepository(Pokemon)
    private pokemonsRepository: Repository<Pokemon>,

    private readonly pokemonService: PokemonService,
  ) {}

  // CREATE
  async create(createTeamDto: CreateTeamDto): Promise<Teams> {
    const team = this.teamsRepository.create(createTeamDto);
    return await this.teamsRepository.save(team);
  }

  // READ ALL
  async findAll(): Promise<Teams[]> {
    return await this.teamsRepository.find({
      relations: ['teamTrainers', 'teamTrainers.trainer', 'teamPokemons', 'teamPokemons.pokemon'],
    });
  }

  // READ ONE
  async findOne(id: number): Promise<Teams> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['teamTrainers', 'teamTrainers.trainer', 'teamPokemons', 'teamPokemons.pokemon'],
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
    // CASCADE vai remover automaticamente:
    // - TeamTrainer (associações com treinadores)
    // - TeamPokemon (associações com pokémons)
    await this.teamsRepository.remove(team);
  }

  // ========== TRAINER METHODS ==========

  async assignTrainer(teamId: number, trainerId: number): Promise<TeamTrainer> {
    const team = await this.findOne(teamId);
    
    const trainer = await this.trainersRepository.findOne({ 
      where: { id: trainerId } 
    });
    
    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${trainerId} não encontrado`);
    }

    const existingAssignment = await this.teamTrainersRepository.findOne({
      where: { team: { id: teamId } },
    });

    if (existingAssignment) {
      throw new ConflictException(
        `O time ${team.name} já possui um treinador associado`
      );
    }

    const teamTrainer = this.teamTrainersRepository.create({
      team,
      trainer,
    });

    return await this.teamTrainersRepository.save(teamTrainer);
  }

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

  async getTeamsByTrainer(trainerId: number): Promise<Teams[]> {
    const trainer = await this.trainersRepository.findOne({
      where: { id: trainerId },
    });

    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${trainerId} não encontrado`);
    }

    const teamTrainers = await this.teamTrainersRepository.find({
      where: { trainer: { id: trainerId } },
      relations: ['team', 'team.teamPokemons', 'team.teamPokemons.pokemon'],
    });

    return teamTrainers.map(tt => tt.team);
  }

  async getTrainerByTeam(teamId: number): Promise<Trainers | null> {
    const teamTrainer = await this.teamTrainersRepository.findOne({
      where: { team: { id: teamId } },
      relations: ['trainer'],
    });

    return teamTrainer ? teamTrainer.trainer : null;
  }

  // ========== POKEMON METHODS ==========

  // Adicionar Pokémon ao time por ID
  async addPokemon(teamId: number, pokemonId: number): Promise<TeamPokemon> {
    const team = await this.findOne(teamId);

    // Verificar se o time já tem 5 Pokémons
    const currentPokemonCount = await this.teamPokemonsRepository.count({
      where: { team: { id: teamId } },
    });

    if (currentPokemonCount >= 5) {
      throw new BadRequestException(
        `O time ${team.name} já possui o máximo de 5 Pokémons`
      );
    }

    // Verificar se o Pokémon existe
    const pokemon = await this.pokemonsRepository.findOne({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokémon com ID ${pokemonId} não encontrado`);
    }

    // Verificar se o Pokémon já está no time
    const existingAssignment = await this.teamPokemonsRepository.findOne({
      where: { 
        team: { id: teamId },
        pokemon: { id: pokemonId }
      },
    });

    if (existingAssignment) {
      throw new ConflictException(
        `O Pokémon ${pokemon.name} já está no time ${team.name}`
      );
    }

    const teamPokemon = this.teamPokemonsRepository.create({
      team,
      pokemon
    });

    return await this.teamPokemonsRepository.save(teamPokemon);
  }

  // Adicionar Pokémon ao time por nome (busca na API se não existir)
  async addPokemonByName(teamId: number, pokemonName: string): Promise<TeamPokemon> {
    // Buscar ou criar o Pokémon (busca na API se não existir)
    const pokemon = await this.pokemonService.findOrCreate(pokemonName);

    return await this.addPokemon(teamId, pokemon.id);
  }

  // Remover Pokémon do time
  async removePokemon(teamId: number, pokemonId: number): Promise<void> {
    const assignment = await this.teamPokemonsRepository.findOne({
      where: { 
        team: { id: teamId },
        pokemon: { id: pokemonId }
      },
      relations: ['pokemon'],
    });

    if (!assignment) {
      throw new NotFoundException(
        `Pokémon não encontrado no time ${teamId}`
      );
    }

    await this.teamPokemonsRepository.remove(assignment);
  }

  // Listar Pokémons de um time
  async getPokemonsByTeam(teamId: number): Promise<Pokemon[]> {
    const team = await this.findOne(teamId);

    const teamPokemons = await this.teamPokemonsRepository.find({
      where: { team: { id: teamId } },
      relations: ['pokemon'],
      order: { position: 'ASC' },
    });

    return teamPokemons.map(tp => tp.pokemon);
  }

  // Listar times que possuem um Pokémon específico
  async getTeamsByPokemon(pokemonId: number): Promise<Teams[]> {
    const pokemon = await this.pokemonsRepository.findOne({
      where: { id: pokemonId },
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokémon com ID ${pokemonId} não encontrado`);
    }

    const teamPokemons = await this.teamPokemonsRepository.find({
      where: { pokemon: { id: pokemonId } },
      relations: ['team', 'team.teamTrainers', 'team.teamTrainers.trainer'],
    });

    return teamPokemons.map(tp => tp.team);
  }

  // Obter detalhes completos do time
  async getTeamDetails(teamId: number) {
    const team = await this.findOne(teamId);
    const trainer = await this.getTrainerByTeam(teamId);
    const pokemons = await this.getPokemonsByTeam(teamId);

    return {
      id: team.id,
      name: team.name,
      status: team.status,
      trainer: trainer ? {
        id: trainer.id,
        name: trainer.name,
      } : null,
      pokemons: pokemons.map(p => ({
        id: p.id,
        name: p.name,
        pokedex_number: p.pokedex_number,
        types: p.types,
        sprite: p.sprite_front,
      })),
      pokemonCount: pokemons.length,
      maxPokemons: 5,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    };
  }
}
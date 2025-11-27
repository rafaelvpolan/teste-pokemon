import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Teams } from './entities/teams.entity';
import { TeamTrainer } from './entities/team-trainer.entity';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Trainers } from '../trainers/entities/trainers.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teams, TeamTrainer, TeamPokemon, Trainers, Pokemon]),
    PokemonModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiModule } from '../external_apis/pokeapi/pokeapi.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    PokeApiModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService],
})
export class PokemonModule {}
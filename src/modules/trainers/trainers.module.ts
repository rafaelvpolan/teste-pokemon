import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './services/trainers.service';
import { Trainers } from './entities/trainers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainers])],
  controllers: [TrainersController],
  providers: [TrainersService],
  exports: [TrainersService], // se outros módulos precisarem usar
})
export class TrainersModule {}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainers } from '../entities/trainers.entity';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainers)
    private userRepository: Repository<Trainers>,
  ) {}

  findAll(): Promise<Trainers[]> {
    return this.userRepository.find();
  }
}
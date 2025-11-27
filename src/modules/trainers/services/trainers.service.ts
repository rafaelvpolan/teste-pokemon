// trainers/trainers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainers } from '../entities/trainers.entity';
import { CreateTrainerDto } from '../dto/create-trainer.dto';
import { UpdateTrainerDto } from '../dto/update-trainer.dto';
import { validStreetCodeBR } from './../utils'
import { BadRequestException } from '@nestjs/common';
import { CepService } from '../../external_apis/cep/cep.service'
import { ViaCepResponse } from '../../external_apis/cep/viacep-response.interface';
@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainers)
    private trainersRepository: Repository<Trainers>,
    private readonly cepService: CepService // injetar o serviço
  ) {}

  // CREATE
  async create(createTrainerDto: CreateTrainerDto): Promise<Trainers> {

    
    if(!validStreetCodeBR(createTrainerDto.cep)){
        throw new BadRequestException('CEP inválido');
    }
    const findInfoAddress: ViaCepResponse  = await this.cepService.findCep(createTrainerDto.cep);

    let newData = createTrainerDto;

    if (findInfoAddress) {
      newData.city = findInfoAddress.localidade;
      newData.neighborhood = findInfoAddress.bairro;
      newData.state = findInfoAddress.uf;
      newData.street = findInfoAddress.logradouro;
    }


    const trainer = this.trainersRepository.create(createTrainerDto);
    return await this.trainersRepository.save(trainer);
  }

  // READ ALL
  async findAll(): Promise<Trainers[]> {
    return await this.trainersRepository.find();
  }

  // READ ONE
  async findOne(id: number): Promise<Trainers> {
    const trainer = await this.trainersRepository.findOne({ where: { id } });
    
    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${id} não encontrado`);
    }
    
    return trainer;
  }

  // UPDATE
  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<Trainers> {
    const trainer = await this.findOne(id);
    
    Object.assign(trainer, updateTrainerDto);
    
    return await this.trainersRepository.save(trainer);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainersRepository.remove(trainer);
  }

  // Buscar por CEP
  async findByCep(cep: string): Promise<Trainers[]> {
    return await this.trainersRepository.find({ where: { cep } });
  }
}
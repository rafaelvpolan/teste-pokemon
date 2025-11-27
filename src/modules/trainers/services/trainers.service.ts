// trainers.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainers } from '../entities/trainers.entity';
import { CreateTrainerDto } from '../dto/create-trainer.dto';
import { UpdateTrainerDto } from '../dto/update-trainer.dto';
import { validStreetCodeBR } from './../utils';
import { CepService } from '../../external_apis/cep/cep.service';
import { ViaCepResponse } from '../../external_apis/cep/viacep-response.interface';

/**
 * Serviço responsável pela gestão de treinadores
 * Integra validação de CEP com a API ViaCEP
 */
@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainers)
    private trainersRepository: Repository<Trainers>,
    private readonly cepService: CepService
  ) {}

  /**
   * Cria um novo treinador
   * Valida o CEP e busca informações de endereço automaticamente via ViaCEP
   * @param createTrainerDto - Dados para criação do treinador
   * @returns Treinador criado
   * @throws BadRequestException se o CEP for inválido
   */
  async create(createTrainerDto: CreateTrainerDto): Promise<Trainers> {
    if(!validStreetCodeBR(createTrainerDto.cep)){
        throw new BadRequestException('CEP inválido');
    }
    
    const findInfoAddress: ViaCepResponse = await this.cepService.findCep(createTrainerDto.cep);

    let newData = createTrainerDto;

    // Preencher automaticamente os dados do endereço se encontrados
    if (findInfoAddress) {
      newData.city = findInfoAddress.localidade;
      newData.neighborhood = findInfoAddress.bairro;
      newData.state = findInfoAddress.uf;
      newData.street = findInfoAddress.logradouro;
    }

    const trainer = this.trainersRepository.create(newData);
    return await this.trainersRepository.save(trainer);
  }

  /**
   * Lista todos os treinadores
   * @returns Array de treinadores
   */
  async findAll(): Promise<Trainers[]> {
    return await this.trainersRepository.find();
  }

  /**
   * Busca um treinador por ID
   * @param id - ID do treinador
   * @returns Treinador encontrado
   * @throws NotFoundException se o treinador não existir
   */
  async findOne(id: number): Promise<Trainers> {
    const trainer = await this.trainersRepository.findOne({ where: { id } });
    
    if (!trainer) {
      throw new NotFoundException(`Trainer com ID ${id} não encontrado`);
    }
    
    return trainer;
  }

  /**
   * Atualiza os dados de um treinador
   * @param id - ID do treinador
   * @param updateTrainerDto - Dados para atualização
   * @returns Treinador atualizado
   * @throws NotFoundException se o treinador não existir
   */
  async update(id: number, updateTrainerDto: UpdateTrainerDto): Promise<Trainers> {
    const trainer = await this.findOne(id);
    
    Object.assign(trainer, updateTrainerDto);
    
    return await this.trainersRepository.save(trainer);
  }

  /**
   * Remove um treinador
   * Só é possível deletar se não houver times associados (CASCADE)
   * @param id - ID do treinador
   * @throws NotFoundException se o treinador não existir
   */
  async remove(id: number): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainersRepository.remove(trainer);
  }

  /**
   * Busca treinadores por CEP
   * @param cep - CEP a ser buscado
   * @returns Array de treinadores com o CEP especificado
   */
  async findByCep(cep: string): Promise<Trainers[]> {
    return await this.trainersRepository.find({ where: { cep } });
  }
}
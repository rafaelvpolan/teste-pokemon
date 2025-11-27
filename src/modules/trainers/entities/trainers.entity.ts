// trainers.entity.ts

import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TeamTrainer } from '../../teams/entities/team-trainer.entity';

@Entity('trainers')
export class Trainers {
  @ApiProperty({
    example: 1,
    description: 'ID único do treinador'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Ash Ketchum',
    description: 'Nome do treinador'
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '01310-100',
    description: 'CEP do endereço do treinador'
  })
  @Column()
  cep: string;

  @ApiProperty({
    example: 'Avenida Paulista',
    description: 'Rua do endereço'
  })
  @Column()
  street: string;

  @ApiProperty({
    example: 'Bela Vista',
    description: 'Bairro do endereço'
  })
  @Column()
  neighborhood: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do endereço'
  })
  @Column()
  city: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado do endereço (sigla com 2 letras)'
  })
  @Column({ length: 2 })
  state: string;

  @ApiProperty({
    description: 'Times associados ao treinador',
    type: () => TeamTrainer,
    isArray: true
  })
  @OneToMany(() => TeamTrainer, teamTrainer => teamTrainer.trainer)
  teamTrainers: TeamTrainer[];

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de criação do registro'
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'Data da última atualização do registro'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
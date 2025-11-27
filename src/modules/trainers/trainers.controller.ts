// trainers.controller.ts

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
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody 
} from '@nestjs/swagger';
import { TrainersService } from './services/trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainers } from './entities/trainers.entity';

@ApiTags('trainers')
@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Criar um novo treinador',
    description: 'Cria um novo treinador. O CEP é validado e as informações de endereço são preenchidas automaticamente via ViaCEP'
  })
  @ApiBody({ type: CreateTrainerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Treinador criado com sucesso',
    type: Trainers
  })
  @ApiResponse({ 
    status: 400, 
    description: 'CEP inválido ou dados inválidos' 
  })
  create(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainers> {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os treinadores',
    description: 'Retorna todos os treinadores cadastrados'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de treinadores retornada com sucesso',
    type: [Trainers]
  })
  findAll(): Promise<Trainers[]> {
    return this.trainersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar treinador por ID',
    description: 'Retorna um treinador específico pelo ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do treinador', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Treinador encontrado com sucesso',
    type: Trainers
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Treinador não encontrado' 
  })
  findOne(@Param('id') id: string): Promise<Trainers> {
    return this.trainersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Atualizar treinador',
    description: 'Atualiza os dados de um treinador existente'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do treinador', 
    example: 1,
    type: Number
  })
  @ApiBody({ type: UpdateTrainerDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Treinador atualizado com sucesso',
    type: Trainers
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Treinador não encontrado' 
  })
  update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainers> {
    return this.trainersService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Deletar treinador',
    description: 'Remove um treinador. Só é possível deletar se não houver times associados'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do treinador', 
    example: 1,
    type: Number
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Treinador deletado com sucesso' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Treinador não encontrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Não é possível deletar. Treinador possui times associados' 
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.trainersService.remove(+id);
  }

  @Get('cep/:cep')
  @ApiOperation({ 
    summary: 'Buscar treinadores por CEP',
    description: 'Retorna todos os treinadores que possuem o CEP especificado'
  })
  @ApiParam({ 
    name: 'cep', 
    description: 'CEP a ser buscado (formato: 00000-000 ou 00000000)', 
    example: '01310-100'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de treinadores com o CEP especificado',
    type: [Trainers]
  })
  findByCep(@Param('cep') cep: string): Promise<Trainers[]> {
    return this.trainersService.findByCep(cep);
  }
}
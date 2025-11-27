// trainers/trainers.controller.ts
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
import { TrainersService } from './services/trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Trainers } from './entities/trainers.entity';
import { validStreetCodeBR } from './utils'
import { BadRequestException } from '@nestjs/common';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  // POST /trainers
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrainerDto: CreateTrainerDto): Promise<Trainers> {

    if(!validStreetCodeBR(createTrainerDto.cep)){
        throw new BadRequestException('CEP inválido');
    }

    return this.trainersService.create(createTrainerDto);
  }

  // GET /trainers
  @Get()
  findAll(): Promise<Trainers[]> {
    return this.trainersService.findAll();
  }

  // GET /trainers/:id
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trainers> {
    return this.trainersService.findOne(+id);
  }

  // PUT /trainers/:id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainers> {
    return this.trainersService.update(+id, updateTrainerDto);
  }

  // DELETE /trainers/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.trainersService.remove(+id);
  }

  // GET /trainers/cep/:cep
  @Get('cep/:cep')
  findByCep(@Param('cep') cep: string): Promise<Trainers[]> {
    return this.trainersService.findByCep(cep);
  }
}
import { Controller, Get } from '@nestjs/common';
import { TrainersService } from '../trainers/trainers.service';

@Controller("trainers")
export class TrainersController {
  constructor(private readonly appService: TrainersService) {}

  @Get()
  getAll(): string {
    return 'GET /trainers';
  }
}

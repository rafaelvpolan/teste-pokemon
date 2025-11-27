// teams/dto/assign-trainer.dto.ts
import { IsNumber } from 'class-validator';

export class AssignTrainerDto {
  @IsNumber()
  trainerId: number;
}
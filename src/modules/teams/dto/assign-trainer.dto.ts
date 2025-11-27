import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AssignTrainerDto {
  @ApiProperty({
    description: 'ID do treinador',
    example: 2,
  })
  @IsNumber()
  trainerId: number;
}
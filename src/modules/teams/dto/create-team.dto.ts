import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeamDto {
  @ApiProperty({
    description: 'Nome do time',
    example: "Rocket City",
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Status do time',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
// teams/dto/create-team.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
import { IsOptional, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  testTask: string;

  @IsString()
  img: string;
}

export class VacancyDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  testTask: string;
  img: string;
}

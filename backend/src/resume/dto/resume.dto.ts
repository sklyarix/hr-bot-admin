import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CreateResumeAnswerDto,
  ResumeAnswerDto,
} from '../../resume_answer/dto/resume_answer.dto';
import { UserDto } from '../../user/dto/user.dto';

export class CreateResumeDto {
  @IsOptional()
  @IsString()
  portfolioLink?: string;

  @IsInt()
  userId: number;

  @IsString()
  salary: string;

  @IsOptional()
  @Type(() => ResumeAnswerDto)
  answers?: ResumeAnswerDto[];
}

export class ResumeDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  portfolioLink: string | null;

  @Type(() => UserDto)
  user: UserDto;

  @Type(() => ResumeAnswerDto)
  answers: ResumeAnswerDto[];
}

import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import type { ResumeDto } from '../../resume/dto/resume.dto';
import type { UserDto } from '../../user/dto/user.dto';
import type { VacancyDto } from '../../vacancy/dto/vacancy.dto';
import { JobApplicationStatus } from '../enums/job_application_status.enum';

//TODO ENUM
export class CreateJobApplicationDto {
  @IsOptional()
  @IsString()
  testTaskResult?: string;

  @IsOptional()
  @IsEnum(JobApplicationStatus)
  status?: JobApplicationStatus;

  @IsInt()
  userId: number;

  @IsInt()
  resumeId: number;

  @IsInt()
  vacancyId: number;
}

export class JobApplicationDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  testTaskResult: string;
  status: JobApplicationStatus;

  user: UserDto;
  resume: ResumeDto;
  vacancy: VacancyDto;
}

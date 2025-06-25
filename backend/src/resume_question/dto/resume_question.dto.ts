import { IsNumber, IsString } from 'class-validator';

export class CreateResumeQuestionDto {
  @IsString()
  text: string;
  @IsNumber()
  minLength: number;
  @IsString()
  validationRegex: string;
  @IsString()
  errorMessage: string;
}

export class ResumeQuestionDto {
  id: number;
  createdAt: Date;
  text: string;
  minLength: number;
  validationRegex: string;
  errorMessage: string;
}

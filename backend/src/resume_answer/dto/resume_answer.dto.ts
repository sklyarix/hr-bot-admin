import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { ResumeQuestionDto } from '../../resume_question/dto/resume_question.dto';

export class CreateResumeAnswerDto {
  @IsString()
  answer: string;

  @IsInt()
  resumeId: number;

  @IsInt()
  questionId: number;
}

export class ResumeAnswerDto {
  @IsString()
  answer: string;

  @IsInt()
  questionId: number;
}

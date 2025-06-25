import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  CreateResumeQuestionDto,
  ResumeQuestionDto,
} from './dto/resume_question.dto';
import { ResumeQuestionsService } from './resume_questions.service';

@Controller('resume_questions')
export class ResumeQuestionsController {
  constructor(
    private readonly resumeQuestionsService: ResumeQuestionsService,
  ) {}

  @Post()
  async create(@Body() dto: CreateResumeQuestionDto) {
    return this.resumeQuestionsService.createQuestion(dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.resumeQuestionsService.removeQuestion(id);
  }

  @Get()
  async getAll(): Promise<ResumeQuestionDto[]> {
    return this.resumeQuestionsService.getAllQuestions();
  }
}

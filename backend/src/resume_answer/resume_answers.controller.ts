import { Controller, Get } from '@nestjs/common';
import type { ResumeAnswersService } from './resume_answers.service';

@Controller('resume_answers')
export class ResumeAnswersController {
  constructor(private readonly resumeAnswersService: ResumeAnswersService) {}

  @Get()
  async getAll() {}
}

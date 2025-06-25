import { Body, Controller, Post } from '@nestjs/common';
import { CreateResumeDto } from './dto/resume.dto';
import type { ResumeEntity } from './resume.entity';

import { ResumesService } from './resumes.service';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumeService: ResumesService) {}

  @Post()
  async create(@Body() dto: CreateResumeDto): Promise<ResumeEntity> {
    return this.resumeService.create(dto);
  }
}

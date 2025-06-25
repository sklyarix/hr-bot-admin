import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ResumeAnswerEntity } from './resume_answer.entity';

@Injectable()
export class ResumeAnswersService {
  constructor(
    @InjectRepository(ResumeAnswerEntity)
    private readonly resumeAnswerRepository: Repository<ResumeAnswerEntity>,
  ) {}
}

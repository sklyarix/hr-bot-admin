import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateResumeDto } from './dto/resume.dto';

import { ResumeEntity } from './resume.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ResumeEntity)
    private readonly resumeRepository: Repository<ResumeEntity>,
  ) {}

  async create(dto: CreateResumeDto): Promise<ResumeEntity> {
    const resume = this.resumeRepository.create({
      ...dto,
      user: { id: dto.userId },
      answers: dto.answers?.map((a) => ({
        answer: a.answer,
        question: { id: a.questionId },
      })),
    });
    return await this.resumeRepository.save(resume);
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeQuestionDto } from './dto/resume_question.dto';
import { ResumeQuestionEntity } from './resume_question.entity';

@Injectable()
export class ResumeQuestionsService {
  constructor(
    @InjectRepository(ResumeQuestionEntity)
    private readonly resumeQuestionRepository: Repository<ResumeQuestionEntity>,
  ) {}

  async createQuestion(
    dto: CreateResumeQuestionDto,
  ): Promise<ResumeQuestionEntity> {
    const question = this.resumeQuestionRepository.create(dto);
    return await this.resumeQuestionRepository.save(question);
  }

  async removeQuestion(id: number): Promise<ResumeQuestionEntity | null> {
    const question = await this.resumeQuestionRepository.findOne({
      where: { id },
    });
    if (!question) {
      throw new ConflictException('The question does not exist');
    }
    return await this.resumeQuestionRepository.remove(question);
  }

  async getAllQuestions(): Promise<ResumeQuestionEntity[]> {
    return await this.resumeQuestionRepository.find();
  }
}

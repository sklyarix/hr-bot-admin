import type { Repository } from 'typeorm';
import { ResumeAnswerEntity } from './resume_answer.entity';
export declare class ResumeAnswersService {
    private readonly resumeAnswerRepository;
    constructor(resumeAnswerRepository: Repository<ResumeAnswerEntity>);
}

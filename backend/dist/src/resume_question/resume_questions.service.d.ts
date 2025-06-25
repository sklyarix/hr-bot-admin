import { Repository } from 'typeorm';
import { CreateResumeQuestionDto } from './dto/resume_question.dto';
import { ResumeQuestionEntity } from './resume_question.entity';
export declare class ResumeQuestionsService {
    private readonly resumeQuestionRepository;
    constructor(resumeQuestionRepository: Repository<ResumeQuestionEntity>);
    createQuestion(dto: CreateResumeQuestionDto): Promise<ResumeQuestionEntity>;
    removeQuestion(id: number): Promise<ResumeQuestionEntity | null>;
    getAllQuestions(): Promise<ResumeQuestionEntity[]>;
}

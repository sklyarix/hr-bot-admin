import { CreateResumeQuestionDto, ResumeQuestionDto } from './dto/resume_question.dto';
import { ResumeQuestionsService } from './resume_questions.service';
export declare class ResumeQuestionsController {
    private readonly resumeQuestionsService;
    constructor(resumeQuestionsService: ResumeQuestionsService);
    create(dto: CreateResumeQuestionDto): Promise<import("./resume_question.entity").ResumeQuestionEntity>;
    delete(id: number): Promise<import("./resume_question.entity").ResumeQuestionEntity | null>;
    getAll(): Promise<ResumeQuestionDto[]>;
}

import { ResumeEntity } from '../resume/resume.entity';
import { ResumeQuestionEntity } from '../resume_question/resume_question.entity';
export declare class ResumeAnswerEntity {
    id: number;
    createdAt: Date;
    answer: string;
    resume: ResumeEntity;
    question: ResumeQuestionEntity | null;
}

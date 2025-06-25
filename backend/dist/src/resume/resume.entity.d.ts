import { ResumeAnswerEntity } from '../resume_answer/resume_answer.entity';
import { UserEntity } from '../user/user.entity';
export declare class ResumeEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    portfolioLink: string;
    salary: string;
    user: UserEntity;
    answers: ResumeAnswerEntity[];
}

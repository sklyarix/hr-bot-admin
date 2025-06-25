import { ResumeAnswerDto } from '../../resume_answer/dto/resume_answer.dto';
import { UserDto } from '../../user/dto/user.dto';
export declare class CreateResumeDto {
    portfolioLink?: string;
    userId: number;
    salary: string;
    answers?: ResumeAnswerDto[];
}
export declare class ResumeDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    portfolioLink: string | null;
    user: UserDto;
    answers: ResumeAnswerDto[];
}

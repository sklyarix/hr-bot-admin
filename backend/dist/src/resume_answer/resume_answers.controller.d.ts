import type { ResumeAnswersService } from './resume_answers.service';
export declare class ResumeAnswersController {
    private readonly resumeAnswersService;
    constructor(resumeAnswersService: ResumeAnswersService);
    getAll(): Promise<void>;
}

import { CreateResumeDto } from './dto/resume.dto';
import type { ResumeEntity } from './resume.entity';
import { ResumesService } from './resumes.service';
export declare class ResumesController {
    private readonly resumeService;
    constructor(resumeService: ResumesService);
    create(dto: CreateResumeDto): Promise<ResumeEntity>;
}

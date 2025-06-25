import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/resume.dto';
import { ResumeEntity } from './resume.entity';
export declare class ResumesService {
    private readonly resumeRepository;
    constructor(resumeRepository: Repository<ResumeEntity>);
    create(dto: CreateResumeDto): Promise<ResumeEntity>;
}

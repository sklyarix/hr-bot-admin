import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/job_application.dto';
import { JobApplicationStatus } from './enums/job_application_status.enum';
import { JobApplicationEntity } from './job_application.entity';
export declare class JobApplicationsService {
    private readonly jobApplicationRepository;
    constructor(jobApplicationRepository: Repository<JobApplicationEntity>);
    create(dto: CreateJobApplicationDto): Promise<JobApplicationEntity | null>;
    getDetailById(id: number): Promise<JobApplicationEntity | null>;
    getAll(): Promise<JobApplicationEntity[]>;
    updateStatus(id: number, status: JobApplicationStatus): Promise<JobApplicationEntity | null>;
    findByUserId(userId: number): Promise<JobApplicationEntity[]>;
    findByUsersIds(userIds: number[]): Promise<JobApplicationEntity[]>;
}

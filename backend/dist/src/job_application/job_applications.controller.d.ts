import { CreateJobApplicationDto } from './dto/job_application.dto';
import { JobApplicationStatus } from './enums/job_application_status.enum';
import { JobApplicationEntity } from './job_application.entity';
import { JobApplicationsService } from './job_applications.service';
export declare class JobApplicationsController {
    private readonly jobApplicationsService;
    constructor(jobApplicationsService: JobApplicationsService);
    create(dto: CreateJobApplicationDto): Promise<JobApplicationEntity | null>;
    getAll(): Promise<JobApplicationEntity[]>;
    getByIdTg(id: number): Promise<JobApplicationEntity | null>;
    getAllByUserId(id: number): Promise<JobApplicationEntity[]>;
    getAllByUserIds(ids: string): Promise<JobApplicationEntity[]>;
    updateStatus(id: number, dto: {
        status: JobApplicationStatus;
    }): Promise<JobApplicationEntity | null>;
}

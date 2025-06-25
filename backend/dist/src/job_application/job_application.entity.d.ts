import { ResumeEntity } from '../resume/resume.entity';
import { UserEntity } from '../user/user.entity';
import { VacancyEntity } from '../vacancy/vacancy.entity';
import { JobApplicationStatus } from './enums/job_application_status.enum';
export declare class JobApplicationEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    testTaskResult: string;
    status: JobApplicationStatus;
    user: UserEntity;
    resume: ResumeEntity;
    vacancy: VacancyEntity;
}

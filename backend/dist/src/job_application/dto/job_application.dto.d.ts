import type { ResumeDto } from '../../resume/dto/resume.dto';
import type { UserDto } from '../../user/dto/user.dto';
import type { VacancyDto } from '../../vacancy/dto/vacancy.dto';
import { JobApplicationStatus } from '../enums/job_application_status.enum';
export declare class CreateJobApplicationDto {
    testTaskResult?: string;
    status?: JobApplicationStatus;
    userId: number;
    resumeId: number;
    vacancyId: number;
}
export declare class JobApplicationDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    testTaskResult: string;
    status: JobApplicationStatus;
    user: UserDto;
    resume: ResumeDto;
    vacancy: VacancyDto;
}

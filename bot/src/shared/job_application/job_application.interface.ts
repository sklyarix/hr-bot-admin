import { EnumJobApplicationStatus } from '../enums/job_application_status.enum';
import { IResume } from '../resume/resume.interface';
import { IUser } from '../user/user.interface';
import { IVacancy } from '../vacancy/vacancy.interface';

export interface ICreateJobApplication {
  testTaskResult?: string;
  status?: EnumJobApplicationStatus;
  userId: number;
  resumeId: number;
  vacancyId: number;
}

export interface IJobApplication {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  testTaskResult: string;
  status: EnumJobApplicationStatus;

  user: IUser;
  resume: IResume;
  vacancy: IVacancy;
}

import { IResumeAnswer } from '../resume_answer/resume_answer.interface';
import { IUser } from '../user/user.interface';

interface IAnswers {
  answer: string;
  questionId: number;
}
export interface ICreateResume {
  portfolioLink: string;
  salary: string;
  userId: number;

  answers?: IAnswers[];
}

export interface IResume {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  portfolioLink: string | null;
  salary: string;
  user: IUser;
  answers: IResumeAnswer[];
}

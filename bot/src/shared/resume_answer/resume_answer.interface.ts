import { IResumeQuestion } from '../resume_question/resume_question.interface';

export interface ICreateResumeAnswer {
  answer: string;
  resumeId: number;
  questionId: number;
}

export interface IResumeAnswer {
  id: number;
  createdAt: Date;
  answer: string;
  question: IResumeQuestion;
}

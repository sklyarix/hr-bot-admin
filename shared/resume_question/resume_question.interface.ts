export interface ICreateResumeQuestion {
  text: string;
}

export interface IResumeQuestion {
  id: number;
  createdAt: Date;
  text: string;
  minLength: number;
  validationRegex: string;
  errorMessage: string;
}

export interface ICreateVacancy {
  name: string;
  description: string;
  testTask: string;
  img: string;
}

export interface IVacancy {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  testTask: string;
  img: string;
}

import { IUser } from '../user/user.interface';

export interface IReferralCodeFull {
  id: number;
  createdAt: Date;
  code: string;
  user: IUser;
}

export interface IReferralCode {
  id: number;
  createdAt: Date;
  code: string;
  userId: number;
}

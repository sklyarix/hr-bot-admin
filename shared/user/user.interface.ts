import { EnumUserRole } from '../enums/user-role.enum';
import { IUserProfile } from '../user_profile/user_profile.interface';

export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  idTg: string;
  role: EnumUserRole;
  profile: IUserProfile;
}
export interface ICreateUser {
  idTg: string;
  role?: EnumUserRole;
  profile?: IUserProfile;
}

export interface IUpdateUser {
  idTg?: string;
  role?: EnumUserRole;
  profile?: IUserProfile;
}

export interface IGetUserByTg {
  idTg: string;
}
export interface IUserIdReferralCode {
  userId: number;
}

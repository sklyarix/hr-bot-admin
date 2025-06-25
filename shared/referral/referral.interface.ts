import { IReferralPayout } from '../referral_payout/referral_payout.interface';
import { IUser } from '../user/user.interface';

export interface ICreateReferral {
  referrerId: number;
  referredId: number;
}

export interface IReferral {
  id: number;
  createdAt: Date;
  referrer: IUser;
  referred: IUser;
  payout?: IReferralPayout;
}

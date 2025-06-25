import { EnumReferralPayoutStatus } from '../enums/referral_payout_status.enum';
import { IJobApplication } from '../job_application/job_application.interface';
import { IReferral } from '../referral/referral.interface';

export interface ICreateReferralPayout {
  amount: number;
  status?: EnumReferralPayoutStatus;
  referralId: number;
  jobApplicationId: number;
}

export interface IReferralPayout {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: EnumReferralPayoutStatus;

  referral: IReferral;
  jobApplication: IJobApplication;
}

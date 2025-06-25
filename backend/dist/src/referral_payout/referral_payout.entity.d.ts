import { JobApplicationEntity } from '../job_application/job_application.entity';
import { ReferralEntity } from '../referral/referral.entity';
import { EnumReferralPayoutStatus } from './enums/referral_payout_status.enum';
export declare class ReferralPayoutEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    status: EnumReferralPayoutStatus;
    referral: ReferralEntity;
    jobApplication: JobApplicationEntity;
}

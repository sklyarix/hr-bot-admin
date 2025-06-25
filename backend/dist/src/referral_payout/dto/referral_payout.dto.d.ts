import type { JobApplicationDto } from '../../job_application/dto/job_application.dto';
import type { ReferralDto } from '../../referral/dto/referral.dto';
import { EnumReferralPayoutStatus } from '../enums/referral_payout_status.enum';
export declare class CreateReferralPayoutDto {
    amount: number;
    status?: EnumReferralPayoutStatus;
    referralId: number;
    jobApplicationId: number;
}
export declare class ReferralPayoutDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    status: EnumReferralPayoutStatus;
    referral: ReferralDto;
    jobApplication: JobApplicationDto;
}

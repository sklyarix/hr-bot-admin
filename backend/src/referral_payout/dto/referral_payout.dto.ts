import { IsNumber, IsEnum, IsOptional, IsInt } from 'class-validator';
import type { JobApplicationDto } from '../../job_application/dto/job_application.dto';
import type { ReferralDto } from '../../referral/dto/referral.dto';
import { EnumReferralPayoutStatus } from '../enums/referral_payout_status.enum';

//TODO Enum перенести

export class CreateReferralPayoutDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsEnum(EnumReferralPayoutStatus)
  status?: EnumReferralPayoutStatus;

  @IsInt()
  referralId: number;

  @IsInt()
  jobApplicationId: number;
}

export class ReferralPayoutDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  status: EnumReferralPayoutStatus;

  referral: ReferralDto;
  jobApplication: JobApplicationDto; // можно раскомментировать, если есть DTO отклика
}

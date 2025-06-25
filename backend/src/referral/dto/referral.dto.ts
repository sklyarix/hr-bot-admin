import { IsInt } from 'class-validator';
import type { ReferralPayoutDto } from '../../referral_payout/dto/referral_payout.dto';
import type { UserDto } from '../../user/dto/user.dto';

export class CreateReferralDto {
  @IsInt()
  referrerId: number;

  @IsInt()
  referredId: number;
}

export class ReferralDto {
  id: number;
  createdAt: Date;
  referrer: UserDto;
  referred: UserDto;
  payout?: ReferralPayoutDto;
}

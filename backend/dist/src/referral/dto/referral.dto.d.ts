import type { ReferralPayoutDto } from '../../referral_payout/dto/referral_payout.dto';
import type { UserDto } from '../../user/dto/user.dto';
export declare class CreateReferralDto {
    referrerId: number;
    referredId: number;
}
export declare class ReferralDto {
    id: number;
    createdAt: Date;
    referrer: UserDto;
    referred: UserDto;
    payout?: ReferralPayoutDto;
}

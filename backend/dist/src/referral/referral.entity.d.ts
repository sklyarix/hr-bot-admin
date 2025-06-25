import { ReferralPayoutEntity } from '../referral_payout/referral_payout.entity';
import { UserEntity } from '../user/user.entity';
export declare class ReferralEntity {
    id: number;
    createdAt: Date;
    referrer: UserEntity;
    referred: UserEntity;
    payout: ReferralPayoutEntity;
}

import type { Repository } from 'typeorm';
import { ReferralPayoutEntity } from './referral_payout.entity';
export declare class ReferralPayoutsService {
    private readonly referralPayoutRepository;
    constructor(referralPayoutRepository: Repository<ReferralPayoutEntity>);
}

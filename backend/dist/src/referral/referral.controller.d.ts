import { CreateReferralDto } from './dto/referral.dto';
import { ReferralEntity } from './referral.entity';
import { ReferralsService } from './referrals.service';
export declare class ReferralsController {
    private readonly referralsService;
    constructor(referralsService: ReferralsService);
    create(dto: CreateReferralDto): Promise<ReferralEntity | null>;
    getAllUserReferrals(userId: number): Promise<ReferralEntity[]>;
}

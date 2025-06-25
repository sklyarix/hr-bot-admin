import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service';
import { CreateReferralDto } from './dto/referral.dto';
import { ReferralEntity } from './referral.entity';
export declare class ReferralsService {
    private readonly referralRepository;
    private readonly userService;
    constructor(referralRepository: Repository<ReferralEntity>, userService: UsersService);
    create(dto: CreateReferralDto): Promise<ReferralEntity | null>;
    getAllUserReferrals(userId: number): Promise<ReferralEntity[]>;
}

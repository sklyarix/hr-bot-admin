import type { UserDto } from '../user/dto/user.dto';
import { ReferralCodeFullDto, UserIdReferralCodeDto } from './dto/referral_code.dto';
import { ReferralCodeEntity } from './referral_codes.entity';
import { ReferralCodesService } from './referral_codes.service';
export declare class ReferralCodesController {
    private readonly referralCodeService;
    constructor(referralCodeService: ReferralCodesService);
    create(dto: UserIdReferralCodeDto): Promise<ReferralCodeFullDto | Error>;
    getUserByCode(code: string): Promise<UserDto | null>;
    isRefCode(userId: number): Promise<ReferralCodeEntity | null>;
}

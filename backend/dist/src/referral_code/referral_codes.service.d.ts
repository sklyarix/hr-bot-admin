import { Repository } from 'typeorm';
import type { UserDto } from '../user/dto/user.dto';
import { UsersService } from '../user/users.service';
import { ReferralCodeFullDto } from './dto/referral_code.dto';
import { ReferralCodeEntity } from './referral_codes.entity';
export declare class ReferralCodesService {
    private readonly referralCodesRepository;
    private readonly userService;
    private generateRefCode;
    constructor(referralCodesRepository: Repository<ReferralCodeEntity>, userService: UsersService);
    create(userId: number): Promise<ReferralCodeFullDto | Error>;
    findCodeByUserId(userId: number): Promise<ReferralCodeEntity | null>;
    findUserByCode(code: string): Promise<UserDto | null>;
}

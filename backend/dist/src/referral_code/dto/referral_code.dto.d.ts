import { UserDto } from '../../user/dto/user.dto';
export declare class UserIdReferralCodeDto {
    userId: number;
}
export declare class ReferralCodeFullDto {
    id: number;
    createdAt: Date;
    code: string;
    user: UserDto;
}
export declare class ReferralCodeDto {
    id: number;
    createdAt: Date;
    code: string;
    userId: number;
}

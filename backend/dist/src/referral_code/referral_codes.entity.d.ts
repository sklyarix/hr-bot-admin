import { UserEntity } from '../user/user.entity';
export declare class ReferralCodeEntity {
    id: number;
    createdAt: Date;
    code: string;
    user: UserEntity;
}

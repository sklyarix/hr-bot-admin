import { UserProfileEntity } from '../user_profile/user_profile.entity';
import { UserRole } from './enums/user-role.enum';
export declare class UserEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    idTg: string;
    role: UserRole;
    profile: UserProfileEntity;
}

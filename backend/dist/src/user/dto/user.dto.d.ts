import type { UserProfileDto } from '../../user_profile/dto/user_profile.dto';
import { UserRole } from '../enums/user-role.enum';
export declare class CreateUserDto {
    idTg: string;
    role?: UserRole;
    profile?: UserProfileDto;
}
export declare class UpdateUserDto {
    idTg?: string;
    role?: UserRole;
    profile?: UserProfileDto;
}
export declare class GetUserByTgDto {
    idTg: string;
}
export declare class UserDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    idTg: string;
    role: UserRole;
    profile: UserProfileDto;
}

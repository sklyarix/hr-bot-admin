import { UserProfileDto } from './dto/user_profile.dto';
import { UserProfilesService } from './user_profiles.service';
export declare class UserProfilesController {
    private readonly userProfile;
    constructor(userProfile: UserProfilesService);
    updateProfile(dto: UserProfileDto & {
        idTg: string;
    }): Promise<import("../user/dto/user.dto").UserDto | null>;
}

import { Repository } from 'typeorm';
import { UsersService } from '../user/users.service';
import { UserProfileDto } from './dto/user_profile.dto';
import { UserProfileEntity } from './user_profile.entity';
export declare class UserProfilesService {
    private readonly userProfileRepository;
    private readonly usersService;
    constructor(userProfileRepository: Repository<UserProfileEntity>, usersService: UsersService);
    updateUserProfile(idTg: string, profileDto: UserProfileDto): Promise<import("../user/dto/user.dto").UserDto | null>;
}

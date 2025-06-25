import { Body, Controller, Put } from '@nestjs/common';
import { UserProfileDto } from './dto/user_profile.dto';
import { UserProfilesService } from './user_profiles.service';

@Controller('user_profiles')
export class UserProfilesController {
  constructor(private readonly userProfile: UserProfilesService) {}

  @Put()
  async updateProfile(@Body() dto: UserProfileDto & { idTg: string }) {
    console.log('dto', dto);
    console.log('idTg', dto.idTg);
    return this.userProfile.updateUserProfile(dto.idTg, dto);
  }
}

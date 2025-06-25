import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import type { IUser } from '../../shared/user/user.interface';

import { IUserProfile } from '../../shared/user_profile/user_profile.interface';
import { encryptData, instanceBackend } from '../helpers';

@Injectable()
export class UserProfilesService {
  private readonly url: string;
  constructor() {
    this.url = `/user_profiles`;
  }

  async updateUserProfile(userProfile: IUserProfile, idTg: string) {
    const data = { ...userProfile, idTg };
    // 🙊 Шифрование данных
    const { encrypted, iv } = encryptData(data);
    const response: AxiosResponse<IUser> = await instanceBackend.put(this.url, {
      encryptedData: encrypted,
      iv,
    });
    return response.data;
  }
}

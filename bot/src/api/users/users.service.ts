import { Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import * as console from 'node:console';

import { ICreateUser, IUser } from '../../shared/user/user.interface';
import { encryptData, instanceBackend } from '../helpers';

@Injectable()
export class UsersService {
  private readonly url: string;
  constructor() {
    this.url = `/users`;
  }

  async createUser(user: ICreateUser): Promise<IUser> {
    // 🙊 Шифрование данных
    const { encrypted, iv } = encryptData(user);
    const response: AxiosResponse<IUser> = await instanceBackend.post(
      this.url,
      {
        encryptedData: encrypted,
        iv,
      },
    );

    return response.data;
  }

  async findUserByIdTg(idTg: string): Promise<IUser> {
    console.log('findUserByIdTg called with:', idTg);

    const response: AxiosResponse<IUser> = await instanceBackend.get(
      `${this.url}/id_tg/${idTg}`,
    );
    console.log('response', response);
    return response.data;
  }
}

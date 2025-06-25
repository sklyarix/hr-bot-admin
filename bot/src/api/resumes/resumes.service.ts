import { Injectable } from '@nestjs/common';
import type { AxiosResponse } from 'axios';
import type {
  ICreateResume,
  IResume,
} from '../../shared/resume/resume.interface';
import { encryptData, instanceBackend } from '../helpers';

@Injectable()
export class ResumesService {
  private readonly url: string;
  constructor() {
    this.url = `/resumes`;
  }

  async create(data: ICreateResume): Promise<IResume> {
    // 🙊 Шифрование данных
    const { encrypted, iv } = encryptData(data);
    const response: AxiosResponse<IResume> = await instanceBackend.post(
      this.url,
      {
        encryptedData: encrypted,
        iv,
      },
    );
    return response.data;
  }
}

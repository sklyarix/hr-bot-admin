import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction } from 'express';
import { decryptData } from '../crypt/decryptData';

@Injectable()
export class HeadersVerificationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const source = req.headers['x-source'] as string;

    // Telegram-бот
    if (source === 'telegram-bot') {
      console.log('telegram-bot');
      if (req.body) {
        const { encryptedData, iv } = req.body as {
          encryptedData?: string;
          iv?: string;
        };

        if (encryptedData && iv) {
          try {
            Object.assign(req, {
              body: decryptData(encryptedData, iv) as Record<string, unknown>,
            });
          } catch (error) {
            console.error('Ошибка расшифровки данных от бота:', error);
          }
        }
      }

      // TODO: Защита если без body
      next();
    }

    // Веб-клиент
    if (source === 'client-web') {
      console.log('client-web');
      next();
    }
  }
}

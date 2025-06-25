import { createCipheriv, randomBytes } from 'crypto';
import axios from 'axios';

const ivLength = 16; // Длина IV для AES-CBC

//TODO: ИСПРАВИТЬ СРОЧНО rawKey

const rawKey = 'abcdef1234567890';

if (rawKey.length !== 16) {
  throw new Error('❌ SECRET_CODE должен быть ровно 16 символов для AES-128');
}
const secretKey = Buffer.from(rawKey);

export const instanceBackend = axios.create({
  //baseURL: process.env.URL_BACKEND,
  baseURL: 'http://localhost:3000',

  headers: {
    'Content-Type': 'application/json',
    'x-source': 'telegram-bot',
  },
});

export const encryptData = (
  dataObject: object,
): { encrypted: string; iv: string } => {
  const data = JSON.stringify(dataObject);

  const iv = randomBytes(ivLength); // Генерация случайного IV
  const cipher = createCipheriv('aes-128-cbc', secretKey, iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return {
    encrypted,
    iv: iv.toString('base64'),
  };
};

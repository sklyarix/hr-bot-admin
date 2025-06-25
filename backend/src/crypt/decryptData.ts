import { createDecipheriv } from 'crypto';

//TODO: ИСПРАВИТЬ СРОЧНО rawKey
const rawKey = 'abcdef1234567890';
if (rawKey.length !== 16) {
  throw new Error('❌ SECRET_CODE должен быть ровно 16 символов для AES-128');
}
const secretKey = Buffer.from(rawKey);

export const decryptData = (encryptedData: string, ivBase64: string): any => {
  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = createDecipheriv('aes-128-cbc', secretKey, iv);

  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  try {
    // Если ты шифруешь JSON — парсим строку
    return JSON.parse(decrypted);
  } catch (err) {
    // Иначе — просто строка
    return decrypted;
  }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = void 0;
const crypto_1 = require("crypto");
const rawKey = 'abcdef1234567890';
if (rawKey.length !== 16) {
    throw new Error('❌ SECRET_CODE должен быть ровно 16 символов для AES-128');
}
const secretKey = Buffer.from(rawKey);
const decryptData = (encryptedData, ivBase64) => {
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = (0, crypto_1.createDecipheriv)('aes-128-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    try {
        return JSON.parse(decrypted);
    }
    catch (err) {
        return decrypted;
    }
};
exports.decryptData = decryptData;
//# sourceMappingURL=decryptData.js.map
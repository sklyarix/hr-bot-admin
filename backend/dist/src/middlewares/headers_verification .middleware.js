"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersVerificationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const decryptData_1 = require("../crypt/decryptData");
let HeadersVerificationMiddleware = class HeadersVerificationMiddleware {
    use(req, res, next) {
        const source = req.headers['x-source'];
        if (source === 'telegram-bot') {
            console.log('telegram-bot');
            if (req.body) {
                const { encryptedData, iv } = req.body;
                if (encryptedData && iv) {
                    try {
                        Object.assign(req, {
                            body: (0, decryptData_1.decryptData)(encryptedData, iv),
                        });
                    }
                    catch (error) {
                        console.error('Ошибка расшифровки данных от бота:', error);
                    }
                }
            }
            next();
        }
        if (source === 'client-web') {
            console.log('client-web');
            next();
        }
    }
};
exports.HeadersVerificationMiddleware = HeadersVerificationMiddleware;
exports.HeadersVerificationMiddleware = HeadersVerificationMiddleware = __decorate([
    (0, common_1.Injectable)()
], HeadersVerificationMiddleware);
//# sourceMappingURL=headers_verification%20.middleware.js.map
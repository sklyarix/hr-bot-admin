"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralCodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../user/users.service");
const referral_codes_entity_1 = require("./referral_codes.entity");
let ReferralCodesService = class ReferralCodesService {
    generateRefCode() {
        return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    }
    constructor(referralCodesRepository, userService) {
        this.referralCodesRepository = referralCodesRepository;
        this.userService = userService;
    }
    async create(userId) {
        const currentReferralCode = await this.findCodeByUserId(userId);
        if (currentReferralCode) {
            return new Error('Referral Code already exists');
        }
        const user = await this.userService.findUserByUserId(userId);
        if (!user) {
            return new Error('User does not exist');
        }
        const code = this.generateRefCode();
        const refCode = this.referralCodesRepository.create({
            code,
            user,
        });
        return await this.referralCodesRepository.save(refCode);
    }
    async findCodeByUserId(userId) {
        return await this.referralCodesRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }
    async findUserByCode(code) {
        const referralCodeEntity = await this.referralCodesRepository.findOne({
            where: {
                code: code,
            },
            relations: ['user'],
        });
        return referralCodeEntity?.user || null;
    }
};
exports.ReferralCodesService = ReferralCodesService;
exports.ReferralCodesService = ReferralCodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(referral_codes_entity_1.ReferralCodeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReferralCodesService);
//# sourceMappingURL=referral_codes.service.js.map
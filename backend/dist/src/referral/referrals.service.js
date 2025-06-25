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
exports.ReferralsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../user/users.service");
const referral_entity_1 = require("./referral.entity");
let ReferralsService = class ReferralsService {
    constructor(referralRepository, userService) {
        this.referralRepository = referralRepository;
        this.userService = userService;
    }
    async create(dto) {
        const referrer = await this.userService.findUserByUserId(dto.referrerId);
        const referred = await this.userService.findUserByUserId(dto.referredId);
        if (!referrer || !referred) {
            throw new common_1.NotFoundException('User does not exist');
        }
        if (referrer.id === referred.id) {
            throw new common_1.BadRequestException('User cannot refer themselves');
        }
        const existingReferral = await this.referralRepository.findOne({
            where: { referred: { id: dto.referredId } },
        });
        if (existingReferral) {
            throw new common_1.ConflictException('User is already referred');
        }
        const reverseReferral = await this.referralRepository.findOne({
            where: {
                referrer: { id: dto.referredId },
                referred: { id: dto.referrerId },
            },
        });
        if (reverseReferral) {
            throw new common_1.ConflictException('You cannot refer someone who already referred you');
        }
        if (referrer.createdAt > referred.createdAt) {
            throw new common_1.ConflictException('You cannot refer a user who registered earlier than you');
        }
        const referral = this.referralRepository.create({
            referrer,
            referred,
        });
        return await this.referralRepository.save(referral);
    }
    async getAllUserReferrals(userId) {
        return await this.referralRepository.find({
            where: {
                referrer: { id: userId },
            },
            relations: ['referred'],
        });
    }
};
exports.ReferralsService = ReferralsService;
exports.ReferralsService = ReferralsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(referral_entity_1.ReferralEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReferralsService);
//# sourceMappingURL=referrals.service.js.map
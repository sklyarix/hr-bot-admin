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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralEntity = void 0;
const typeorm_1 = require("typeorm");
const referral_payout_entity_1 = require("../referral_payout/referral_payout.entity");
const user_entity_1 = require("../user/user.entity");
let ReferralEntity = class ReferralEntity {
};
exports.ReferralEntity = ReferralEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReferralEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReferralEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'referrerId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ReferralEntity.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'referredId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ReferralEntity.prototype, "referred", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => referral_payout_entity_1.ReferralPayoutEntity, (payout) => payout.referral),
    __metadata("design:type", referral_payout_entity_1.ReferralPayoutEntity)
], ReferralEntity.prototype, "payout", void 0);
exports.ReferralEntity = ReferralEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'referrals' })
], ReferralEntity);
//# sourceMappingURL=referral.entity.js.map
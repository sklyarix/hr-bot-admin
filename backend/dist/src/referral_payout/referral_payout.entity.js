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
exports.ReferralPayoutEntity = void 0;
const typeorm_1 = require("typeorm");
const job_application_entity_1 = require("../job_application/job_application.entity");
const referral_entity_1 = require("../referral/referral.entity");
const referral_payout_status_enum_1 = require("./enums/referral_payout_status.enum");
let ReferralPayoutEntity = class ReferralPayoutEntity {
};
exports.ReferralPayoutEntity = ReferralPayoutEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReferralPayoutEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReferralPayoutEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReferralPayoutEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ReferralPayoutEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: referral_payout_status_enum_1.EnumReferralPayoutStatus,
        default: referral_payout_status_enum_1.EnumReferralPayoutStatus.PENDING,
    }),
    __metadata("design:type", String)
], ReferralPayoutEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => referral_entity_1.ReferralEntity, (referral) => referral.payout, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'referralId' }),
    __metadata("design:type", referral_entity_1.ReferralEntity)
], ReferralPayoutEntity.prototype, "referral", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => job_application_entity_1.JobApplicationEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'jobApplicationId' }),
    __metadata("design:type", job_application_entity_1.JobApplicationEntity)
], ReferralPayoutEntity.prototype, "jobApplication", void 0);
exports.ReferralPayoutEntity = ReferralPayoutEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'referral_payouts' })
], ReferralPayoutEntity);
//# sourceMappingURL=referral_payout.entity.js.map
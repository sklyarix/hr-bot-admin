"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralPayoutsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const referral_payout_entity_1 = require("./referral_payout.entity");
const referral_payouts_controller_1 = require("./referral_payouts.controller");
const referral_payouts_service_1 = require("./referral_payouts.service");
let ReferralPayoutsModule = class ReferralPayoutsModule {
};
exports.ReferralPayoutsModule = ReferralPayoutsModule;
exports.ReferralPayoutsModule = ReferralPayoutsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([referral_payout_entity_1.ReferralPayoutEntity])],
        providers: [referral_payouts_service_1.ReferralPayoutsService],
        controllers: [referral_payouts_controller_1.ReferralPayoutsController],
        exports: [referral_payouts_service_1.ReferralPayoutsService],
    })
], ReferralPayoutsModule);
//# sourceMappingURL=referral_payouts.module.js.map
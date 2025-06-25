"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../user/users.module");
const referral_controller_1 = require("./referral.controller");
const referral_entity_1 = require("./referral.entity");
const referrals_service_1 = require("./referrals.service");
let ReferralsModule = class ReferralsModule {
};
exports.ReferralsModule = ReferralsModule;
exports.ReferralsModule = ReferralsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([referral_entity_1.ReferralEntity]), users_module_1.UsersModule],
        providers: [referrals_service_1.ReferralsService],
        controllers: [referral_controller_1.ReferralsController],
        exports: [referrals_service_1.ReferralsService],
    })
], ReferralsModule);
//# sourceMappingURL=referrals.module.js.map
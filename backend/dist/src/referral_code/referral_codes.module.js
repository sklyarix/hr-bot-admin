"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralCodesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../user/users.module");
const referral_codes_controller_1 = require("./referral_codes.controller");
const referral_codes_entity_1 = require("./referral_codes.entity");
const referral_codes_service_1 = require("./referral_codes.service");
let ReferralCodesModule = class ReferralCodesModule {
};
exports.ReferralCodesModule = ReferralCodesModule;
exports.ReferralCodesModule = ReferralCodesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([referral_codes_entity_1.ReferralCodeEntity]), users_module_1.UsersModule],
        providers: [referral_codes_service_1.ReferralCodesService],
        controllers: [referral_codes_controller_1.ReferralCodesController],
        exports: [referral_codes_service_1.ReferralCodesService],
    })
], ReferralCodesModule);
//# sourceMappingURL=referral_codes.module.js.map
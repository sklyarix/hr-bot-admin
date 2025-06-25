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
exports.ReferralPayoutsController = void 0;
const common_1 = require("@nestjs/common");
let ReferralPayoutsController = class ReferralPayoutsController {
    constructor(referralPayoutsService) {
        this.referralPayoutsService = referralPayoutsService;
    }
};
exports.ReferralPayoutsController = ReferralPayoutsController;
exports.ReferralPayoutsController = ReferralPayoutsController = __decorate([
    (0, common_1.Controller)('referral_payouts'),
    __metadata("design:paramtypes", [Function])
], ReferralPayoutsController);
//# sourceMappingURL=referral_payouts.controller.js.map
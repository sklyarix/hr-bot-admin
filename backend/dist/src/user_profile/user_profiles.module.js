"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../user/users.module");
const user_profile_entity_1 = require("./user_profile.entity");
const user_profiles_controller_1 = require("./user_profiles.controller");
const user_profiles_service_1 = require("./user_profiles.service");
let UserProfilesModule = class UserProfilesModule {
};
exports.UserProfilesModule = UserProfilesModule;
exports.UserProfilesModule = UserProfilesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_profile_entity_1.UserProfileEntity]), users_module_1.UsersModule],
        providers: [user_profiles_service_1.UserProfilesService],
        controllers: [user_profiles_controller_1.UserProfilesController],
        exports: [user_profiles_service_1.UserProfilesService],
    })
], UserProfilesModule);
//# sourceMappingURL=user_profiles.module.js.map
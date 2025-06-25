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
exports.UserProfilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../user/users.service");
const user_profile_entity_1 = require("./user_profile.entity");
let UserProfilesService = class UserProfilesService {
    constructor(userProfileRepository, usersService) {
        this.userProfileRepository = userProfileRepository;
        this.usersService = usersService;
    }
    async updateUserProfile(idTg, profileDto) {
        const user = await this.usersService.findUserByTgId(idTg);
        if (!user) {
            throw new common_1.NotFoundException('User profile does not exist');
        }
        await this.userProfileRepository.update({ user }, {
            fullName: profileDto.fullName,
            age: profileDto.age,
            city: profileDto.city,
        });
        return await this.usersService.findUserByTgId(idTg);
    }
};
exports.UserProfilesService = UserProfilesService;
exports.UserProfilesService = UserProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], UserProfilesService);
//# sourceMappingURL=user_profiles.service.js.map
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
exports.UserDto = exports.GetUserByTgDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../enums/user-role.enum");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'Invalid idTG' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "idTg", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Function)
], CreateUserDto.prototype, "profile", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "idTg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Function)
], UpdateUserDto.prototype, "profile", void 0);
class GetUserByTgDto {
}
exports.GetUserByTgDto = GetUserByTgDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUserByTgDto.prototype, "idTg", void 0);
class UserDto {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map
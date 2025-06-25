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
exports.ResumeDto = exports.CreateResumeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const resume_answer_dto_1 = require("../../resume_answer/dto/resume_answer.dto");
const user_dto_1 = require("../../user/dto/user.dto");
class CreateResumeDto {
}
exports.CreateResumeDto = CreateResumeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "portfolioLink", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateResumeDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => resume_answer_dto_1.ResumeAnswerDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "answers", void 0);
class ResumeDto {
}
exports.ResumeDto = ResumeDto;
__decorate([
    (0, class_transformer_1.Type)(() => user_dto_1.UserDto),
    __metadata("design:type", user_dto_1.UserDto)
], ResumeDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => resume_answer_dto_1.ResumeAnswerDto),
    __metadata("design:type", Array)
], ResumeDto.prototype, "answers", void 0);
//# sourceMappingURL=resume.dto.js.map
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
exports.ResumeEntity = void 0;
const typeorm_1 = require("typeorm");
const resume_answer_entity_1 = require("../resume_answer/resume_answer.entity");
const user_entity_1 = require("../user/user.entity");
let ResumeEntity = class ResumeEntity {
};
exports.ResumeEntity = ResumeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResumeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResumeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ResumeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResumeEntity.prototype, "portfolioLink", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResumeEntity.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], ResumeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resume_answer_entity_1.ResumeAnswerEntity, (answer) => answer.resume, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ResumeEntity.prototype, "answers", void 0);
exports.ResumeEntity = ResumeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'resumes' })
], ResumeEntity);
//# sourceMappingURL=resume.entity.js.map
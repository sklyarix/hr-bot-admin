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
exports.JobApplicationEntity = void 0;
const typeorm_1 = require("typeorm");
const resume_entity_1 = require("../resume/resume.entity");
const user_entity_1 = require("../user/user.entity");
const vacancy_entity_1 = require("../vacancy/vacancy.entity");
const job_application_status_enum_1 = require("./enums/job_application_status.enum");
let JobApplicationEntity = class JobApplicationEntity {
};
exports.JobApplicationEntity = JobApplicationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobApplicationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobApplicationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobApplicationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JobApplicationEntity.prototype, "testTaskResult", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: job_application_status_enum_1.JobApplicationStatus,
        default: job_application_status_enum_1.JobApplicationStatus.NO_REVIEW,
    }),
    __metadata("design:type", String)
], JobApplicationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], JobApplicationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_entity_1.ResumeEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'resumeId' }),
    __metadata("design:type", resume_entity_1.ResumeEntity)
], JobApplicationEntity.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vacancy_entity_1.VacancyEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'vacancyId' }),
    __metadata("design:type", vacancy_entity_1.VacancyEntity)
], JobApplicationEntity.prototype, "vacancy", void 0);
exports.JobApplicationEntity = JobApplicationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'job_applications' })
], JobApplicationEntity);
//# sourceMappingURL=job_application.entity.js.map
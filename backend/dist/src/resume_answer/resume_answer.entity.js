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
exports.ResumeAnswerEntity = void 0;
const typeorm_1 = require("typeorm");
const resume_entity_1 = require("../resume/resume.entity");
const resume_question_entity_1 = require("../resume_question/resume_question.entity");
let ResumeAnswerEntity = class ResumeAnswerEntity {
};
exports.ResumeAnswerEntity = ResumeAnswerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResumeAnswerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResumeAnswerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ResumeAnswerEntity.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_entity_1.ResumeEntity, (resume) => resume.answers, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", resume_entity_1.ResumeEntity)
], ResumeAnswerEntity.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_question_entity_1.ResumeQuestionEntity, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ResumeAnswerEntity.prototype, "question", void 0);
exports.ResumeAnswerEntity = ResumeAnswerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'resume_answers' })
], ResumeAnswerEntity);
//# sourceMappingURL=resume_answer.entity.js.map
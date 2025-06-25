"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeAnswersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resume_answer_entity_1 = require("./resume_answer.entity");
const resume_answers_controller_1 = require("./resume_answers.controller");
const resume_answers_service_1 = require("./resume_answers.service");
let ResumeAnswersModule = class ResumeAnswersModule {
};
exports.ResumeAnswersModule = ResumeAnswersModule;
exports.ResumeAnswersModule = ResumeAnswersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([resume_answer_entity_1.ResumeAnswerEntity])],
        providers: [resume_answers_service_1.ResumeAnswersService],
        controllers: [resume_answers_controller_1.ResumeAnswersController],
        exports: [resume_answers_service_1.ResumeAnswersService],
    })
], ResumeAnswersModule);
//# sourceMappingURL=resume_answers.module.js.map
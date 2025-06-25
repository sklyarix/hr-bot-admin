"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeQuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const resume_question_entity_1 = require("./resume_question.entity");
const resume_questions_controller_1 = require("./resume_questions.controller");
const resume_questions_service_1 = require("./resume_questions.service");
let ResumeQuestionsModule = class ResumeQuestionsModule {
};
exports.ResumeQuestionsModule = ResumeQuestionsModule;
exports.ResumeQuestionsModule = ResumeQuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([resume_question_entity_1.ResumeQuestionEntity])],
        controllers: [resume_questions_controller_1.ResumeQuestionsController],
        providers: [resume_questions_service_1.ResumeQuestionsService],
        exports: [resume_questions_service_1.ResumeQuestionsService],
    })
], ResumeQuestionsModule);
//# sourceMappingURL=resume_questions.module.js.map
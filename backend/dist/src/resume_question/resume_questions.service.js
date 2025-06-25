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
exports.ResumeQuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const resume_question_entity_1 = require("./resume_question.entity");
let ResumeQuestionsService = class ResumeQuestionsService {
    constructor(resumeQuestionRepository) {
        this.resumeQuestionRepository = resumeQuestionRepository;
    }
    async createQuestion(dto) {
        const question = this.resumeQuestionRepository.create(dto);
        return await this.resumeQuestionRepository.save(question);
    }
    async removeQuestion(id) {
        const question = await this.resumeQuestionRepository.findOne({
            where: { id },
        });
        if (!question) {
            throw new common_1.ConflictException('The question does not exist');
        }
        return await this.resumeQuestionRepository.remove(question);
    }
    async getAllQuestions() {
        return await this.resumeQuestionRepository.find();
    }
};
exports.ResumeQuestionsService = ResumeQuestionsService;
exports.ResumeQuestionsService = ResumeQuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_question_entity_1.ResumeQuestionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResumeQuestionsService);
//# sourceMappingURL=resume_questions.service.js.map
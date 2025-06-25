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
exports.JobApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_application_status_enum_1 = require("./enums/job_application_status.enum");
const job_application_entity_1 = require("./job_application.entity");
let JobApplicationsService = class JobApplicationsService {
    constructor(jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }
    async create(dto) {
        const jobApplication = this.jobApplicationRepository.create({
            testTaskResult: dto.testTaskResult,
            status: dto.status ?? job_application_status_enum_1.JobApplicationStatus.NO_REVIEW,
            user: { id: dto.userId },
            resume: { id: dto.resumeId },
            vacancy: { id: dto.vacancyId },
        });
        const saved = await this.jobApplicationRepository.save(jobApplication);
        return await this.jobApplicationRepository.findOne({
            where: { id: saved.id },
            relations: ['user', 'user.profile', 'resume', 'vacancy'],
        });
    }
    async getDetailById(id) {
        return await this.jobApplicationRepository.findOne({
            where: { id },
            relations: [
                'user',
                'user.profile',
                'resume',
                'resume.answers',
                'resume.answers.question',
                'vacancy',
            ],
        });
    }
    async getAll() {
        return await this.jobApplicationRepository.find({
            relations: ['user', 'user.profile', 'resume', 'vacancy'],
        });
    }
    async updateStatus(id, status) {
        await this.jobApplicationRepository.update(id, { status });
        return await this.getDetailById(id);
    }
    async findByUserId(userId) {
        return await this.jobApplicationRepository.find({
            where: {
                user: { id: userId },
            },
        });
    }
    async findByUsersIds(userIds) {
        return this.jobApplicationRepository.find({
            where: {
                user: { id: (0, typeorm_2.In)(userIds) },
            },
            relations: ['user', 'user.profile', 'vacancy'],
        });
    }
};
exports.JobApplicationsService = JobApplicationsService;
exports.JobApplicationsService = JobApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_application_entity_1.JobApplicationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobApplicationsService);
//# sourceMappingURL=job_applications.service.js.map
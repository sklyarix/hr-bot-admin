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
exports.JobApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const job_application_dto_1 = require("./dto/job_application.dto");
const job_applications_service_1 = require("./job_applications.service");
let JobApplicationsController = class JobApplicationsController {
    constructor(jobApplicationsService) {
        this.jobApplicationsService = jobApplicationsService;
    }
    async create(dto) {
        return this.jobApplicationsService.create(dto);
    }
    async getAll() {
        return this.jobApplicationsService.getAll();
    }
    async getByIdTg(id) {
        return this.jobApplicationsService.getDetailById(id);
    }
    async getAllByUserId(id) {
        return this.jobApplicationsService.findByUserId(id);
    }
    async getAllByUserIds(ids) {
        const userIds = ids.split(',').map((id) => parseInt(id.trim(), 10));
        return this.jobApplicationsService.findByUsersIds(userIds);
    }
    async updateStatus(id, dto) {
        return this.jobApplicationsService.updateStatus(id, dto.status);
    }
};
exports.JobApplicationsController = JobApplicationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_application_dto_1.CreateJobApplicationDto]),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "getByIdTg", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "getAllByUserIds", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], JobApplicationsController.prototype, "updateStatus", null);
exports.JobApplicationsController = JobApplicationsController = __decorate([
    (0, common_1.Controller)('job_applications'),
    __metadata("design:paramtypes", [job_applications_service_1.JobApplicationsService])
], JobApplicationsController);
//# sourceMappingURL=job_applications.controller.js.map
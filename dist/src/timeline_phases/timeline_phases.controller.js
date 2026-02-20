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
exports.TimelinePhasesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const timeline_phases_service_1 = require("./timeline_phases.service");
const create_timeline_phase_dto_1 = require("./dto/create-timeline_phase.dto");
const update_timeline_phase_dto_1 = require("./dto/update-timeline_phase.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let TimelinePhasesController = class TimelinePhasesController {
    timelinePhasesService;
    constructor(timelinePhasesService) {
        this.timelinePhasesService = timelinePhasesService;
    }
    async create(createTimelinePhaseDto) {
        return this.timelinePhasesService.create(createTimelinePhaseDto);
    }
    async findAllByTetConfig(tetConfigId) {
        return this.timelinePhasesService.findAllByTetConfig(tetConfigId);
    }
    async findOne(id) {
        return this.timelinePhasesService.findOne(id);
    }
    async update(id, updateTimelinePhaseDto) {
        return this.timelinePhasesService.update(id, updateTimelinePhaseDto);
    }
    async remove(id) {
        return this.timelinePhasesService.remove(id);
    }
};
exports.TimelinePhasesController = TimelinePhasesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a timeline phase for a tet config' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Timeline phase created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_timeline_phase_dto_1.CreateTimelinePhaseDto]),
    __metadata("design:returntype", Promise)
], TimelinePhasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('tet-config/:tetConfigId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all timeline phases for a tet config' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Timeline phases returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('tetConfigId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimelinePhasesController.prototype, "findAllByTetConfig", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a timeline phase by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Timeline phase returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Timeline phase not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimelinePhasesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a timeline phase' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Timeline phase updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Timeline phase not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_timeline_phase_dto_1.UpdateTimelinePhaseDto]),
    __metadata("design:returntype", Promise)
], TimelinePhasesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a timeline phase' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Timeline phase deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Timeline phase not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimelinePhasesController.prototype, "remove", null);
exports.TimelinePhasesController = TimelinePhasesController = __decorate([
    (0, swagger_1.ApiTags)('timeline-phases'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('timeline-phases'),
    __metadata("design:paramtypes", [timeline_phases_service_1.TimelinePhasesService])
], TimelinePhasesController);
//# sourceMappingURL=timeline_phases.controller.js.map
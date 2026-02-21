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
exports.TetConfigsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tet_configs_service_1 = require("./tet_configs.service");
const create_tet_config_dto_1 = require("./dto/create-tet_config.dto");
const update_tet_config_dto_1 = require("./dto/update-tet_config.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let TetConfigsController = class TetConfigsController {
    tetConfigsService;
    constructor(tetConfigsService) {
        this.tetConfigsService = tetConfigsService;
    }
    async create(req, createTetConfigDto) {
        return this.tetConfigsService.create(req.user.userId, createTetConfigDto);
    }
    async findAll(req) {
        return this.tetConfigsService.findAllByUser(req.user.userId);
    }
    async getBudgetSummary(id) {
        return this.tetConfigsService.getBudgetSummary(id);
    }
    async findOne(id) {
        return this.tetConfigsService.findOne(id);
    }
    async updateBudget(id, body) {
        return this.tetConfigsService.updateBudget(id, body.total_budget);
    }
    async update(id, updateTetConfigDto) {
        return this.tetConfigsService.update(id, updateTetConfigDto);
    }
    async remove(id) {
        return this.tetConfigsService.remove(id);
    }
};
exports.TetConfigsController = TetConfigsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tet config (setup budget)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tet config created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_tet_config_dto_1.CreateTetConfigDto]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tet configs for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tet configs returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/budget'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget summary (total and used from purchased items)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Budget summary returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tet config not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "getBudgetSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a tet config by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tet config returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tet config not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/budget'),
    (0, swagger_1.ApiOperation)({ summary: 'Update total budget for a tet config' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Budget updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tet config not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "updateBudget", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a tet config' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tet config updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tet config not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tet_config_dto_1.UpdateTetConfigDto]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a tet config' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tet config deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tet config not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TetConfigsController.prototype, "remove", null);
exports.TetConfigsController = TetConfigsController = __decorate([
    (0, swagger_1.ApiTags)('tet-configs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tet-configs'),
    __metadata("design:paramtypes", [tet_configs_service_1.TetConfigsService])
], TetConfigsController);
//# sourceMappingURL=tet_configs.controller.js.map
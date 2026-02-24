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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getOverview(req, tetConfigId) {
        return this.dashboardService.getOverview(req.user.userId, tetConfigId);
    }
    async getBudgetSummary(req, tetConfigId) {
        return this.dashboardService.getBudgetSummary(req.user.userId, tetConfigId);
    }
    async getExpenseByCategory(req, tetConfigId) {
        return this.dashboardService.getExpenseByCategory(req.user.userId, tetConfigId);
    }
    async getTrend(req, tetConfigId, groupBy) {
        return this.dashboardService.getTrend(req.user.userId, tetConfigId, groupBy === 'month' ? 'month' : 'week');
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get task & shopping overview for a tet config' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Overview returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('budget-summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget summary for a tet config' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Budget summary returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getBudgetSummary", null);
__decorate([
    (0, common_1.Get)('expense-by-category'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expense breakdown by category for a tet config' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense by category returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getExpenseByCategory", null);
__decorate([
    (0, common_1.Get)('trend'),
    (0, swagger_1.ApiOperation)({ summary: 'Get spending trend (planned vs used) grouped by week or month' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'group_by', required: false, enum: ['week', 'month'], description: 'Grouping period (default: week)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trend data returned' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Access denied' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('tet_config_id')),
    __param(2, (0, common_1.Query)('group_by')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTrend", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map
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
exports.BudgetTransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const budget_transactions_service_1 = require("./budget_transactions.service");
const create_budget_transaction_dto_1 = require("./dto/create-budget_transaction.dto");
const update_budget_transaction_dto_1 = require("./dto/update-budget_transaction.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let BudgetTransactionsController = class BudgetTransactionsController {
    budgetTransactionsService;
    constructor(budgetTransactionsService) {
        this.budgetTransactionsService = budgetTransactionsService;
    }
    async create(req, createDto) {
        return this.budgetTransactionsService.create(req.user.userId, createDto);
    }
    async findAll(tetConfigId) {
        return this.budgetTransactionsService.findAllByTetConfig(tetConfigId);
    }
    async findOne(id) {
        return this.budgetTransactionsService.findOne(id);
    }
    async update(id, updateDto) {
        return this.budgetTransactionsService.update(id, updateDto);
    }
    async remove(id) {
        return this.budgetTransactionsService.remove(id);
    }
};
exports.BudgetTransactionsController = BudgetTransactionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new budget transaction' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Transaction created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_budget_transaction_dto_1.CreateBudgetTransactionDto]),
    __metadata("design:returntype", Promise)
], BudgetTransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all budget transactions by tet config' }),
    (0, swagger_1.ApiQuery)({ name: 'tet_config_id', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transactions returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Query)('tet_config_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetTransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a budget transaction by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction returned' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transaction not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetTransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a budget transaction' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transaction not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_budget_transaction_dto_1.UpdateBudgetTransactionDto]),
    __metadata("design:returntype", Promise)
], BudgetTransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a budget transaction' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transaction not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetTransactionsController.prototype, "remove", null);
exports.BudgetTransactionsController = BudgetTransactionsController = __decorate([
    (0, swagger_1.ApiTags)('budget-transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('budget-transactions'),
    __metadata("design:paramtypes", [budget_transactions_service_1.BudgetTransactionsService])
], BudgetTransactionsController);
//# sourceMappingURL=budget_transactions.controller.js.map
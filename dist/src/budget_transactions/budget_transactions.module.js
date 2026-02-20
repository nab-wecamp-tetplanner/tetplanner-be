"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetTransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const budget_transactions_service_1 = require("./budget_transactions.service");
const budget_transactions_controller_1 = require("./budget_transactions.controller");
const budget_transaction_entity_1 = require("./entities/budget_transaction.entity");
let BudgetTransactionsModule = class BudgetTransactionsModule {
};
exports.BudgetTransactionsModule = BudgetTransactionsModule;
exports.BudgetTransactionsModule = BudgetTransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([budget_transaction_entity_1.BudgetTransaction])],
        controllers: [budget_transactions_controller_1.BudgetTransactionsController],
        providers: [budget_transactions_service_1.BudgetTransactionsService],
    })
], BudgetTransactionsModule);
//# sourceMappingURL=budget_transactions.module.js.map
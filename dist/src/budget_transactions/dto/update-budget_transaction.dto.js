"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBudgetTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_budget_transaction_dto_1 = require("./create-budget_transaction.dto");
class UpdateBudgetTransactionDto extends (0, mapped_types_1.PartialType)(create_budget_transaction_dto_1.CreateBudgetTransactionDto) {
}
exports.UpdateBudgetTransactionDto = UpdateBudgetTransactionDto;
//# sourceMappingURL=update-budget_transaction.dto.js.map
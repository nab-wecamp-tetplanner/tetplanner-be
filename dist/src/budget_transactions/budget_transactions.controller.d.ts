import { BudgetTransactionsService } from './budget_transactions.service';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';
export declare class BudgetTransactionsController {
    private readonly budgetTransactionsService;
    constructor(budgetTransactionsService: BudgetTransactionsService);
    create(req: any, createDto: CreateBudgetTransactionDto): Promise<import("./entities/budget_transaction.entity").BudgetTransaction>;
    findAll(tetConfigId: string): Promise<import("./entities/budget_transaction.entity").BudgetTransaction[]>;
    findOne(id: string): Promise<import("./entities/budget_transaction.entity").BudgetTransaction>;
    update(id: string, updateDto: UpdateBudgetTransactionDto): Promise<import("./entities/budget_transaction.entity").BudgetTransaction>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

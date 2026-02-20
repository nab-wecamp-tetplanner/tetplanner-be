import { Repository } from 'typeorm';
import { BudgetTransaction } from './entities/budget_transaction.entity';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';
export declare class BudgetTransactionsService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<BudgetTransaction>);
    create(userId: string, createDto: CreateBudgetTransactionDto): Promise<BudgetTransaction>;
    findAllByTetConfig(tetConfigId: string): Promise<BudgetTransaction[]>;
    findOne(id: string): Promise<BudgetTransaction>;
    update(id: string, updateDto: UpdateBudgetTransactionDto): Promise<BudgetTransaction>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

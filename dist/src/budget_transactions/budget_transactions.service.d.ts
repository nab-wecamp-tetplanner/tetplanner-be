import { Repository } from 'typeorm';
import { BudgetTransaction } from './entities/budget_transaction.entity';
import { CreateBudgetTransactionDto } from './dto/create-budget_transaction.dto';
import { UpdateBudgetTransactionDto } from './dto/update-budget_transaction.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
export declare class BudgetTransactionsService {
    private readonly transactionRepository;
    private readonly collaboratorsService;
    constructor(transactionRepository: Repository<BudgetTransaction>, collaboratorsService: CollaboratorsService);
    create(userId: string, createDto: CreateBudgetTransactionDto): Promise<BudgetTransaction>;
    findAllByTetConfig(userId: string, tetConfigId: string): Promise<BudgetTransaction[]>;
    findOne(userId: string, id: string): Promise<BudgetTransaction>;
    update(userId: string, id: string, updateDto: UpdateBudgetTransactionDto): Promise<BudgetTransaction>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
}

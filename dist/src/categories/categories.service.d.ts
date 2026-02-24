import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly tetConfigRepository;
    private readonly transactionRepository;
    private readonly collaboratorsService;
    constructor(categoryRepository: Repository<Category>, tetConfigRepository: Repository<TetConfig>, transactionRepository: Repository<BudgetTransaction>, collaboratorsService: CollaboratorsService);
    private getAllocatedSum;
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllByTetConfig(tetConfigId: string): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findTransactions(userId: string, categoryId: string, from?: string, to?: string, page?: number, limit?: number): Promise<{
        data: BudgetTransaction[];
        total: number;
        page: number;
        limit: number;
    }>;
}

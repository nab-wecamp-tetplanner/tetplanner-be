import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAll(tetConfigId: string): Promise<import("./entities/category.entity").Category[]>;
    findTransactions(req: AuthRequest, id: string, from?: string, to?: string, page?: string, limit?: string): Promise<{
        data: import("../budget_transactions/entities/budget_transaction.entity").BudgetTransaction[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

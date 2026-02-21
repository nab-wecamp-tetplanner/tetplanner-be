import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
export declare class TetConfigsService {
    private readonly tetConfigRepository;
    private readonly todoItemRepository;
    private readonly categoryRepository;
    private readonly budgetCalculationsService;
    constructor(tetConfigRepository: Repository<TetConfig>, todoItemRepository: Repository<TodoItem>, categoryRepository: Repository<Category>, budgetCalculationsService: BudgetCalculationsService);
    create(userId: string, createTetConfigDto: CreateTetConfigDto): Promise<TetConfig>;
    findAllByUser(userId: string): Promise<TetConfig[]>;
    findOne(id: string): Promise<TetConfig>;
    update(id: string, updateTetConfigDto: UpdateTetConfigDto): Promise<TetConfig>;
    updateBudget(id: string, totalBudget: number): Promise<TetConfig>;
    getBudgetSummary(id: string): Promise<{
        total_budget: number;
        used_budget: number;
        remaining_budget: number;
        percentage_used: number;
        warning_level: "ok" | "warning" | "critical";
        categories: {
            id: string;
            name: string;
            icon: string;
            allocated_budget: number | null;
            used_budget: number;
            remaining_budget: number | null;
            percentage_used: number | null;
            warning_level: string;
        }[];
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

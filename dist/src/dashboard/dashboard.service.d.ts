import { Repository } from 'typeorm';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
export declare class DashboardService {
    private readonly tetConfigRepository;
    private readonly todoItemRepository;
    private readonly transactionRepository;
    private readonly categoryRepository;
    private readonly collaboratorsService;
    private readonly budgetCalculationsService;
    constructor(tetConfigRepository: Repository<TetConfig>, todoItemRepository: Repository<TodoItem>, transactionRepository: Repository<BudgetTransaction>, categoryRepository: Repository<Category>, collaboratorsService: CollaboratorsService, budgetCalculationsService: BudgetCalculationsService);
    getOverview(userId: string, tetConfigId: string): Promise<{
        tet_config: {
            id: string;
            name: string;
            year: number;
            currency: string;
        };
        tasks: {
            total: number;
            completed: number;
            pending: number;
            in_progress: number;
            overdue: number;
            completion_rate: number;
            upcoming_deadlines: number;
        };
        shopping: {
            total: number;
            purchased: number;
        };
    }>;
    getBudgetSummary(userId: string, tetConfigId: string): Promise<{
        currency: string;
        total_budget: number;
        planned_budget: number;
        used_budget: number;
        remaining_budget: number;
        percentage_planned: number;
        percentage_used: number;
        categories: {
            id: string;
            name: string;
            color: string;
            allocated_budget: number | null;
            planned_budget: number;
            used_budget: number;
            remaining_budget: number | null;
        }[];
    }>;
    getExpenseByCategory(userId: string, tetConfigId: string): Promise<{
        currency: string;
        categories: {
            id: string;
            name: string;
            color: string;
            icon: string;
            used: number;
            planned: number;
        }[];
    }>;
    getTrend(userId: string, tetConfigId: string, groupBy?: 'week' | 'month'): Promise<{
        currency: string;
        group_by: "week" | "month";
        data: {
            period: string;
            used: number;
            planned: number;
        }[];
    }>;
}

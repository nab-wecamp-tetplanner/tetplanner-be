import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { Category } from '../categories/entities/category.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
export declare class TetConfigsService {
    private readonly tetConfigRepository;
    private readonly categoryRepository;
    private readonly collaboratorRepository;
    private readonly budgetCalculationsService;
    constructor(tetConfigRepository: Repository<TetConfig>, categoryRepository: Repository<Category>, collaboratorRepository: Repository<Collaborator>, budgetCalculationsService: BudgetCalculationsService);
    create(userId: string, createTetConfigDto: CreateTetConfigDto): Promise<TetConfig>;
    findAllByUser(userId: string): Promise<TetConfig[]>;
    findOne(id: string): Promise<TetConfig>;
    update(id: string, updateTetConfigDto: UpdateTetConfigDto): Promise<TetConfig>;
    updateBudget(id: string, totalBudget: number): Promise<TetConfig>;
    getBudgetSummary(id: string): Promise<{
        total_budget: number;
        planned_budget: number;
        used_budget: number;
        remaining_budget: number;
        percentage_planned: number;
        percentage_used: number;
        warning_level: "ok" | "warning" | "critical";
        categories: {
            id: string;
            name: string;
            icon: string;
            allocated_budget: number | null;
            planned_budget: number;
            used_budget: number;
            remaining_budget: number | null;
            percentage_planned: number | null;
            percentage_used: number | null;
            warning_level: string;
        }[];
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

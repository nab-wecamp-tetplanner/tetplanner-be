import { Repository } from 'typeorm';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { CreateTetConfigDto } from './dto/create-tet_config.dto';
import { UpdateTetConfigDto } from './dto/update-tet_config.dto';
export declare class TetConfigsService {
    private readonly tetConfigRepository;
    private readonly todoItemRepository;
    constructor(tetConfigRepository: Repository<TetConfig>, todoItemRepository: Repository<TodoItem>);
    create(userId: string, createTetConfigDto: CreateTetConfigDto): Promise<TetConfig>;
    findAllByUser(userId: string): Promise<TetConfig[]>;
    findOne(id: string): Promise<TetConfig>;
    update(id: string, updateTetConfigDto: UpdateTetConfigDto): Promise<TetConfig>;
    updateBudget(id: string, totalBudget: number): Promise<TetConfig>;
    getBudgetSummary(id: string): Promise<{
        total_budget: number;
        used_budget: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
export declare class BudgetCalculationsService {
    private readonly todoItemRepository;
    constructor(todoItemRepository: Repository<TodoItem>);
    calculateTotalUsed(tetConfigId: string): Promise<number>;
    calculateUsedByCategory(tetConfigId: string): Promise<Map<string, number>>;
    calculatePercentage(used: number, total: number): number;
}

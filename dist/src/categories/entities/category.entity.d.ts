import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';
export declare class Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    is_system: boolean;
    allocated_budget: number;
    deleted_at: Date;
    tet_config: TetConfig;
    todo_items: TodoItem[];
    budget_transactions: BudgetTransaction[];
}

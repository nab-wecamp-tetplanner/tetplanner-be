import { TransactionType } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { Category } from '../../categories/entities/category.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { User } from '../../users/entities/user.entity';
export declare class BudgetTransaction {
    id: string;
    amount: number;
    type: TransactionType;
    note: string;
    transaction_date: Date;
    tet_config: TetConfig;
    category: Category;
    todo_item: TodoItem;
    recorded_by_user: User;
}

import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';
export declare class User {
    id: string;
    email: string;
    password_hash: string;
    name: string;
    is_verified: boolean;
    image_url: string;
    created_at: Date;
    deleted_at: Date;
    tet_configs: TetConfig[];
    collaborators: Collaborator[];
    notifications: Notification[];
    assigned_todo_items: TodoItem[];
    recorded_transactions: BudgetTransaction[];
}

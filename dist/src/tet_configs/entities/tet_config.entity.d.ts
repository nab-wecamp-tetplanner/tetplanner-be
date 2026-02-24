import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { TimelinePhase } from '../../timeline_phases/entities/timeline_phase.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
export declare class TetConfig {
    id: string;
    year: number;
    name: string;
    total_budget: number;
    currency: string;
    created_at: Date;
    deleted_at: Date;
    owner: User;
    categories: Category[];
    timeline_phases: TimelinePhase[];
    todo_items: TodoItem[];
    budget_transactions: BudgetTransaction[];
    collaborators: Collaborator[];
}

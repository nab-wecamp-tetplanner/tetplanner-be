import { TodoPriority, TodoStatus } from '../../helper/enums';
export declare class CreateTodoItemDto {
    title: string;
    priority?: TodoPriority;
    status?: TodoStatus;
    deadline?: Date;
    is_shopping?: boolean;
    estimated_price?: number;
    quantity?: number;
    assigned_to?: string;
    subtasks?: Record<string, boolean>;
    tet_config_id: string;
    timeline_phase_id: string;
    category_id?: string;
}

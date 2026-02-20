import { User } from '../../users/entities/user.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
export declare class Notification {
    id: string;
    title: string;
    is_read: boolean;
    created_at: Date;
    user: User;
    todo_item: TodoItem;
}

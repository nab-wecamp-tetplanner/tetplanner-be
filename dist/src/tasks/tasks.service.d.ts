import { Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class TasksService {
    private readonly todoItemRepository;
    private readonly notificationsService;
    private readonly logger;
    constructor(todoItemRepository: Repository<TodoItem>, notificationsService: NotificationsService);
    checkOverdueTasks(): Promise<void>;
}

import { Repository } from 'typeorm';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { CollaboratorsService } from '../collaborators/collaborators.service';
export declare class TasksQueryService {
    private readonly todoItemRepository;
    private readonly collaboratorsService;
    constructor(todoItemRepository: Repository<TodoItem>, collaboratorsService: CollaboratorsService);
    getToday(userId: string, tetConfigId: string): Promise<TodoItem[]>;
    getUpcoming(userId: string, tetConfigId: string): Promise<TodoItem[]>;
}

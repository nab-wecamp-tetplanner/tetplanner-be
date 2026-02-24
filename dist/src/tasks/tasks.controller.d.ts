import { TasksQueryService } from './tasks-query.service';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class TasksController {
    private readonly tasksQueryService;
    constructor(tasksQueryService: TasksQueryService);
    getToday(req: AuthRequest, tetConfigId: string): Promise<import("../todo_items/entities/todo_item.entity").TodoItem[]>;
    getUpcoming(req: AuthRequest, tetConfigId: string): Promise<import("../todo_items/entities/todo_item.entity").TodoItem[]>;
}

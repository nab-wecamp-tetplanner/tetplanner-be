import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo_item.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../collaborators/entities/collaborator.entity';
import { BudgetTransaction } from '../budget_transactions/entities/budget_transaction.entity';
import { TimelinePhase } from '../timeline_phases/entities/timeline_phase.entity';
import { CreateTodoItemDto } from './dto/create-todo_item.dto';
import { UpdateTodoItemDto } from './dto/update-todo_item.dto';
import { CollaboratorsService } from '../collaborators/collaborators.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BudgetCalculationsService } from '../helper/budget-calculations.service';
export declare class TodoItemsService {
    private readonly todoItemRepository;
    private readonly tetConfigRepository;
    private readonly collaboratorRepository;
    private readonly budgetTransactionRepository;
    private readonly timelinePhaseRepository;
    private readonly collaboratorsService;
    private readonly notificationsService;
    private readonly budgetCalculationsService;
    constructor(todoItemRepository: Repository<TodoItem>, tetConfigRepository: Repository<TetConfig>, collaboratorRepository: Repository<Collaborator>, budgetTransactionRepository: Repository<BudgetTransaction>, timelinePhaseRepository: Repository<TimelinePhase>, collaboratorsService: CollaboratorsService, notificationsService: NotificationsService, budgetCalculationsService: BudgetCalculationsService);
    create(userId: string, createDto: CreateTodoItemDto): Promise<TodoItem>;
    findAllByTetConfig(userId: string, tetConfigId: string, timelinePhaseId?: string): Promise<TodoItem[]>;
    findAllByTimelinePhase(userId: string, phaseId: string): Promise<TodoItem[]>;
    findOne(userId: string, id: string): Promise<TodoItem>;
    update(userId: string, id: string, updateDto: UpdateTodoItemDto): Promise<{
        todo_item: TodoItem;
        budget: {
            total_budget: number;
            planned_budget: number;
            used_budget: number;
            remaining_budget: number;
            percentage_used: number;
            percentage_planned: number;
            warning_level: string;
        };
    }>;
    upsertSubtask(userId: string, id: string, name: string, done: boolean): Promise<TodoItem>;
    removeSubtask(userId: string, id: string, name: string): Promise<TodoItem>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
    private checkBudgetAndNotify;
}

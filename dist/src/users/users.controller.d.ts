import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        is_verified: boolean;
        image_url: string;
        created_at: Date;
        deleted_at: Date;
        tet_configs: import("../tet_configs/entities/tet_config.entity").TetConfig[];
        collaborators: import("../collaborators/entities/collaborator.entity").Collaborator[];
        notifications: import("../notifications/entities/notification.entity").Notification[];
        assigned_todo_items: import("../todo_items/entities/todo_item.entity").TodoItem[];
        recorded_transactions: import("../budget_transactions/entities/budget_transaction.entity").BudgetTransaction[];
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        is_verified: boolean;
        image_url: string;
        created_at: Date;
        deleted_at: Date;
        tet_configs: import("../tet_configs/entities/tet_config.entity").TetConfig[];
        collaborators: import("../collaborators/entities/collaborator.entity").Collaborator[];
        notifications: import("../notifications/entities/notification.entity").Notification[];
        assigned_todo_items: import("../todo_items/entities/todo_item.entity").TodoItem[];
        recorded_transactions: import("../budget_transactions/entities/budget_transaction.entity").BudgetTransaction[];
    }>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        message: string;
        image_url: string;
    }>;
}

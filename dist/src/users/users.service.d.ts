import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseStorageService } from '../supabase-storage/supabase-storage.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly storageService;
    constructor(userRepository: Repository<User>, storageService: SupabaseStorageService);
    findById(userId: string): Promise<{
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
    update(userId: string, updateUserDto: UpdateUserDto): Promise<{
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
    uploadAvatar(userId: string, file: Express.Multer.File): Promise<{
        message: string;
        image_url: string;
    }>;
}

import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationRepository;
    constructor(notificationRepository: Repository<Notification>);
    createForTodoItem(userId: string, todoItemId: string, title: string): Promise<Notification>;
    createForUser(userId: string, title: string): Promise<Notification>;
    findAllByUser(userId: string): Promise<Notification[]>;
    markRead(id: string, userId: string): Promise<Notification>;
    markAllRead(userId: string): Promise<{
        message: string;
    }>;
}

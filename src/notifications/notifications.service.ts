import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createForTodoItem(userId: string, todoItemId: string, title: string) {
    const notification = this.notificationRepository.create({
      title,
      is_read: false,
      user: { id: userId },
      todo_item: { id: todoItemId },
    });
    return this.notificationRepository.save(notification);
  }

  async findAllByUser(userId: string) {
    return this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  async markRead(id: string, userId: string) {
    const notification = await this.notificationRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    notification.is_read = true;
    return this.notificationRepository.save(notification);
  }

  async markAllRead(userId: string) {
    await this.notificationRepository.update({ user: { id: userId }, is_read: false }, { is_read: true });
    return { message: 'All notifications marked as read' };
  }
}

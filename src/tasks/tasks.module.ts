import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem]), NotificationsModule],
  providers: [TasksService],
})
export class TasksModule {}

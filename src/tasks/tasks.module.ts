import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksQueryService } from './tasks-query.service';
import { TasksController } from './tasks.controller';
import { TodoItem } from '../todo_items/entities/todo_item.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { CollaboratorsModule } from '../collaborators/collaborators.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem]), NotificationsModule, CollaboratorsModule],
  controllers: [TasksController],
  providers: [TasksService, TasksQueryService],
})
export class TasksModule {}

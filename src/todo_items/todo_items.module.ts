import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';
import { TodoItem } from './entities/todo_item.entity';
import { CollaboratorsModule } from '../collaborators/collaborators.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem]), CollaboratorsModule],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}

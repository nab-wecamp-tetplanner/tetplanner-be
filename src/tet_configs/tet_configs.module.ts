import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TetConfigsService } from './tet_configs.service';
import { TetConfigsController } from './tet_configs.controller';
import { TetConfig } from './entities/tet_config.entity';
import { TodoItem } from '../todo_items/entities/todo_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TetConfig, TodoItem])],
  controllers: [TetConfigsController],
  providers: [TetConfigsService],
})
export class TetConfigsModule {}

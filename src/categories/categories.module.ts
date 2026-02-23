import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, TetConfig])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

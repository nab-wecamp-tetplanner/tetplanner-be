import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TetConfigsModule } from './tet_configs/tet_configs.module';
import { CategoriesModule } from './categories/categories.module';
import { TimelinePhasesModule } from './timeline_phases/timeline_phases.module';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { BudgetTransactionsModule } from './budget_transactions/budget_transactions.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TasksModule } from './tasks/tasks.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../database/data-source';
import { AuthModule } from './auth/auth.module';
import { SupabaseStorageService } from './supabase-storage/supabase-storage.service';
import { SupabaseStorageModule } from './supabase-storage/supabase-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env', // Commented out - use environment variables from Docker/system
      load: [configuration],
      validationSchema: joi.object({
        DB_DATABASE: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PORT: joi.number().default(5432),
        DB_PASSWORD: joi.string().required(),
        DB_HOST: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ScheduleModule.forRoot(),
    TasksModule,
    UsersModule,
    TetConfigsModule,
    CategoriesModule,
    TimelinePhasesModule,
    TodoItemsModule,
    BudgetTransactionsModule,
    CollaboratorsModule,
    NotificationsModule,
    DashboardModule,
    AuthModule,
    SupabaseStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseStorageService],
})
export class AppModule {}

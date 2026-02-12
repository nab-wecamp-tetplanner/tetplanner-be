import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TetConfig } from 'src/tet_configs/entities/tet_config.entity';
import { Category } from 'src/categories/entities/category.entity';
import { TimelinePhase } from 'src/timeline_phases/entities/timeline_phase.entity';
import { TodoItem } from 'src/todo_items/entities/todo_item.entity';
import { BudgetTransaction } from 'src/budget_transactions/entities/budget_transaction.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService], // injecttttttttt configservice
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT', 5432),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [User, TetConfig, Category, TimelinePhase, TodoItem, BudgetTransaction, Collaborator, Notification], // change later
    autoLoadEntities: true,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'], // change later
    synchronize: true,
  }),
};
// for cli

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '135792468',
  database: process.env.DB_DATABASE || 'tetplanner-db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

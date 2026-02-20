"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../src/users/entities/user.entity");
const tet_config_entity_1 = require("../src/tet_configs/entities/tet_config.entity");
const category_entity_1 = require("../src/categories/entities/category.entity");
const timeline_phase_entity_1 = require("../src/timeline_phases/entities/timeline_phase.entity");
const todo_item_entity_1 = require("../src/todo_items/entities/todo_item.entity");
const budget_transaction_entity_1 = require("../src/budget_transactions/entities/budget_transaction.entity");
const collaborator_entity_1 = require("../src/collaborators/entities/collaborator.entity");
const notification_entity_1 = require("../src/notifications/entities/notification.entity");
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule.forRoot()],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [user_entity_1.User, tet_config_entity_1.TetConfig, category_entity_1.Category, timeline_phase_entity_1.TimelinePhase, todo_item_entity_1.TodoItem, budget_transaction_entity_1.BudgetTransaction, collaborator_entity_1.Collaborator, notification_entity_1.Notification],
        autoLoadEntities: true,
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        synchronize: true,
    }),
};
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '135792468',
    database: process.env.DB_DATABASE || 'tetplanner-db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map
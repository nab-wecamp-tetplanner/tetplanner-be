"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const tet_configs_module_1 = require("./tet_configs/tet_configs.module");
const categories_module_1 = require("./categories/categories.module");
const timeline_phases_module_1 = require("./timeline_phases/timeline_phases.module");
const todo_items_module_1 = require("./todo_items/todo_items.module");
const budget_transactions_module_1 = require("./budget_transactions/budget_transactions.module");
const collaborators_module_1 = require("./collaborators/collaborators.module");
const notifications_module_1 = require("./notifications/notifications.module");
const config_1 = require("@nestjs/config");
const joi = __importStar(require("joi"));
const configuration_1 = __importDefault(require("./config/configuration"));
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../database/data-source");
const auth_module_1 = require("./auth/auth.module");
const supabase_storage_service_1 = require("./supabase-storage/supabase-storage.service");
const supabase_storage_module_1 = require("./supabase-storage/supabase-storage.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validationSchema: joi.object({
                    DB_DATABASE: joi.string().required(),
                    DB_USERNAME: joi.string().required(),
                    DB_PORT: joi.number().default(5432),
                    DB_PASSWORD: joi.string().required(),
                    DB_HOST: joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(data_source_1.typeOrmConfig),
            users_module_1.UsersModule,
            tet_configs_module_1.TetConfigsModule,
            categories_module_1.CategoriesModule,
            timeline_phases_module_1.TimelinePhasesModule,
            todo_items_module_1.TodoItemsModule,
            budget_transactions_module_1.BudgetTransactionsModule,
            collaborators_module_1.CollaboratorsModule,
            notifications_module_1.NotificationsModule,
            auth_module_1.AuthModule,
            supabase_storage_module_1.SupabaseStorageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, supabase_storage_service_1.SupabaseStorageService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
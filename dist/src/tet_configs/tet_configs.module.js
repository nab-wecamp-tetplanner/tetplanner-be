"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetConfigsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tet_configs_service_1 = require("./tet_configs.service");
const tet_configs_controller_1 = require("./tet_configs.controller");
const tet_config_entity_1 = require("./entities/tet_config.entity");
const todo_item_entity_1 = require("../todo_items/entities/todo_item.entity");
let TetConfigsModule = class TetConfigsModule {
};
exports.TetConfigsModule = TetConfigsModule;
exports.TetConfigsModule = TetConfigsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tet_config_entity_1.TetConfig, todo_item_entity_1.TodoItem])],
        controllers: [tet_configs_controller_1.TetConfigsController],
        providers: [tet_configs_service_1.TetConfigsService],
    })
], TetConfigsModule);
//# sourceMappingURL=tet_configs.module.js.map
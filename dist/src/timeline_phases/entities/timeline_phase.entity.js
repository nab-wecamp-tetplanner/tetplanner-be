"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinePhase = void 0;
const typeorm_1 = require("typeorm");
const tet_config_entity_1 = require("../../tet_configs/entities/tet_config.entity");
const todo_item_entity_1 = require("../../todo_items/entities/todo_item.entity");
let TimelinePhase = class TimelinePhase {
    id;
    name;
    start_date;
    end_date;
    display_order;
    tet_config;
    todo_items;
};
exports.TimelinePhase = TimelinePhase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TimelinePhase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TimelinePhase.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], TimelinePhase.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], TimelinePhase.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], TimelinePhase.prototype, "display_order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tet_config_entity_1.TetConfig, (tet_config) => tet_config.timeline_phases),
    (0, typeorm_1.JoinColumn)({ name: 'tet_config_id' }),
    __metadata("design:type", tet_config_entity_1.TetConfig)
], TimelinePhase.prototype, "tet_config", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todo_item_entity_1.TodoItem, (todo_item) => todo_item.timeline_phase, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], TimelinePhase.prototype, "todo_items", void 0);
exports.TimelinePhase = TimelinePhase = __decorate([
    (0, typeorm_1.Entity)('timeline_phases')
], TimelinePhase);
//# sourceMappingURL=timeline_phase.entity.js.map
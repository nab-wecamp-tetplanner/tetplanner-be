"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinePhasesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const timeline_phases_service_1 = require("./timeline_phases.service");
const timeline_phases_controller_1 = require("./timeline_phases.controller");
const timeline_phase_entity_1 = require("./entities/timeline_phase.entity");
const collaborators_module_1 = require("../collaborators/collaborators.module");
let TimelinePhasesModule = class TimelinePhasesModule {
};
exports.TimelinePhasesModule = TimelinePhasesModule;
exports.TimelinePhasesModule = TimelinePhasesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([timeline_phase_entity_1.TimelinePhase]), collaborators_module_1.CollaboratorsModule],
        controllers: [timeline_phases_controller_1.TimelinePhasesController],
        providers: [timeline_phases_service_1.TimelinePhasesService],
    })
], TimelinePhasesModule);
//# sourceMappingURL=timeline_phases.module.js.map
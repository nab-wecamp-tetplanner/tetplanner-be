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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinePhasesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const timeline_phase_entity_1 = require("./entities/timeline_phase.entity");
let TimelinePhasesService = class TimelinePhasesService {
    timelinePhaseRepository;
    constructor(timelinePhaseRepository) {
        this.timelinePhaseRepository = timelinePhaseRepository;
    }
    async create(createTimelinePhaseDto) {
        const phase = this.timelinePhaseRepository.create({
            ...createTimelinePhaseDto,
            tet_config: { id: createTimelinePhaseDto.tet_config_id },
        });
        return this.timelinePhaseRepository.save(phase);
    }
    async findAllByTetConfig(tetConfigId) {
        return this.timelinePhaseRepository.find({
            where: { tet_config: { id: tetConfigId } },
            order: { display_order: 'ASC' },
        });
    }
    async findOne(id) {
        const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
        if (!phase)
            throw new common_1.NotFoundException('Timeline phase not found');
        return phase;
    }
    async update(id, updateTimelinePhaseDto) {
        const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
        if (!phase)
            throw new common_1.NotFoundException('Timeline phase not found');
        Object.assign(phase, updateTimelinePhaseDto);
        return this.timelinePhaseRepository.save(phase);
    }
    async remove(id) {
        const phase = await this.timelinePhaseRepository.findOne({ where: { id } });
        if (!phase)
            throw new common_1.NotFoundException('Timeline phase not found');
        await this.timelinePhaseRepository.remove(phase);
        return { message: 'Timeline phase deleted successfully' };
    }
};
exports.TimelinePhasesService = TimelinePhasesService;
exports.TimelinePhasesService = TimelinePhasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timeline_phase_entity_1.TimelinePhase)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimelinePhasesService);
//# sourceMappingURL=timeline_phases.service.js.map
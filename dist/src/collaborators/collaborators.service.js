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
exports.CollaboratorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collaborator_entity_1 = require("./entities/collaborator.entity");
const tet_config_entity_1 = require("../tet_configs/entities/tet_config.entity");
let CollaboratorsService = class CollaboratorsService {
    collaboratorRepository;
    tetConfigRepository;
    constructor(collaboratorRepository, tetConfigRepository) {
        this.collaboratorRepository = collaboratorRepository;
        this.tetConfigRepository = tetConfigRepository;
    }
    async checkAccess(userId, tetConfigId) {
        const tetConfig = await this.tetConfigRepository.findOne({
            where: { id: tetConfigId },
            relations: ['owner'],
        });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        if (tetConfig.owner.id === userId)
            return;
        const collab = await this.collaboratorRepository.findOne({
            where: { tet_config: { id: tetConfigId }, user: { id: userId } },
        });
        if (!collab)
            throw new common_1.ForbiddenException('Access denied');
    }
    async checkOwner(userId, tetConfigId) {
        const tetConfig = await this.tetConfigRepository.findOne({
            where: { id: tetConfigId },
            relations: ['owner'],
        });
        if (!tetConfig)
            throw new common_1.NotFoundException('Tet config not found');
        if (tetConfig.owner.id !== userId)
            throw new common_1.ForbiddenException('Only the owner can manage collaborators');
    }
    async add(ownerId, createDto) {
        await this.checkOwner(ownerId, createDto.tet_config_id);
        const existing = await this.collaboratorRepository.findOne({
            where: { tet_config: { id: createDto.tet_config_id }, user: { id: createDto.user_id } },
        });
        if (existing)
            throw new common_1.ConflictException('User is already a collaborator');
        const collaborator = this.collaboratorRepository.create({
            role: createDto.role,
            tet_config: { id: createDto.tet_config_id },
            user: { id: createDto.user_id },
        });
        return this.collaboratorRepository.save(collaborator);
    }
    async findAllByTetConfig(userId, tetConfigId) {
        await this.checkAccess(userId, tetConfigId);
        return this.collaboratorRepository.find({
            where: { tet_config: { id: tetConfigId } },
            relations: ['user'],
        });
    }
    async updateRole(id, ownerId, role) {
        const collab = await this.collaboratorRepository.findOne({
            where: { id },
            relations: ['tet_config', 'tet_config.owner'],
        });
        if (!collab)
            throw new common_1.NotFoundException('Collaborator not found');
        if (collab.tet_config.owner.id !== ownerId)
            throw new common_1.ForbiddenException('Only the owner can update roles');
        collab.role = role;
        return this.collaboratorRepository.save(collab);
    }
    async remove(id, ownerId) {
        const collab = await this.collaboratorRepository.findOne({
            where: { id },
            relations: ['tet_config', 'tet_config.owner'],
        });
        if (!collab)
            throw new common_1.NotFoundException('Collaborator not found');
        if (collab.tet_config.owner.id !== ownerId)
            throw new common_1.ForbiddenException('Only the owner can remove collaborators');
        await this.collaboratorRepository.remove(collab);
        return { message: 'Collaborator removed successfully' };
    }
};
exports.CollaboratorsService = CollaboratorsService;
exports.CollaboratorsService = CollaboratorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collaborator_entity_1.Collaborator)),
    __param(1, (0, typeorm_1.InjectRepository)(tet_config_entity_1.TetConfig)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CollaboratorsService);
//# sourceMappingURL=collaborators.service.js.map
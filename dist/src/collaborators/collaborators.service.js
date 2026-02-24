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
const user_entity_1 = require("../users/entities/user.entity");
const enums_1 = require("../helper/enums");
const notifications_service_1 = require("../notifications/notifications.service");
let CollaboratorsService = class CollaboratorsService {
    collaboratorRepository;
    tetConfigRepository;
    userRepository;
    notificationsService;
    constructor(collaboratorRepository, tetConfigRepository, userRepository, notificationsService) {
        this.collaboratorRepository = collaboratorRepository;
        this.tetConfigRepository = tetConfigRepository;
        this.userRepository = userRepository;
        this.notificationsService = notificationsService;
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
            where: { tet_config: { id: tetConfigId }, user: { id: userId }, status: enums_1.CollaboratorStatus.ACCEPTED },
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
        const invitedUser = await this.userRepository.findOne({ where: { email: createDto.user_email } });
        if (!invitedUser)
            throw new common_1.NotFoundException('User with that email not found');
        const existing = await this.collaboratorRepository.findOne({
            where: { tet_config: { id: createDto.tet_config_id }, user: { id: invitedUser.id } },
        });
        if (existing)
            throw new common_1.ConflictException('User is already a collaborator');
        const collaborator = this.collaboratorRepository.create({
            role: createDto.role,
            status: enums_1.CollaboratorStatus.PENDING,
            tet_config: { id: createDto.tet_config_id },
            user: { id: invitedUser.id },
        });
        const saved = await this.collaboratorRepository.save(collaborator);
        const tetConfig = await this.tetConfigRepository.findOne({ where: { id: createDto.tet_config_id } });
        await this.notificationsService.createForUser(invitedUser.id, `You've been invited to collaborate on "${tetConfig.name}"`);
        return saved;
    }
    async accept(id, userId) {
        const collab = await this.collaboratorRepository.findOne({
            where: { id },
            relations: ['user', 'tet_config'],
        });
        if (!collab)
            throw new common_1.NotFoundException('Invitation not found');
        if (collab.user.id !== userId)
            throw new common_1.ForbiddenException('This invitation is not for you');
        if (collab.status !== enums_1.CollaboratorStatus.PENDING)
            throw new common_1.ConflictException('Invitation is no longer pending');
        collab.status = enums_1.CollaboratorStatus.ACCEPTED;
        collab.accepted_at = new Date();
        return this.collaboratorRepository.save(collab);
    }
    async decline(id, userId) {
        const collab = await this.collaboratorRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!collab)
            throw new common_1.NotFoundException('Invitation not found');
        if (collab.user.id !== userId)
            throw new common_1.ForbiddenException('This invitation is not for you');
        if (collab.status !== enums_1.CollaboratorStatus.PENDING)
            throw new common_1.ConflictException('Invitation is no longer pending');
        await this.collaboratorRepository.remove(collab);
        return { message: 'Invitation declined' };
    }
    async getMyInvitations(userId) {
        return this.collaboratorRepository.find({
            where: { user: { id: userId }, status: enums_1.CollaboratorStatus.PENDING },
            relations: ['tet_config', 'tet_config.owner'],
        });
    }
    async findAllByTetConfig(userId, tetConfigId) {
        await this.checkAccess(userId, tetConfigId);
        const [tetConfig, collaborators] = await Promise.all([this.tetConfigRepository.findOne({ where: { id: tetConfigId }, relations: ['owner'] }), this.collaboratorRepository.find({ where: { tet_config: { id: tetConfigId } }, relations: ['user'] })]);
        return {
            owner: { id: tetConfig.owner.id, name: tetConfig.owner.name, email: tetConfig.owner.email },
            collaborators,
        };
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
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_1.NotificationsService])
], CollaboratorsService);
//# sourceMappingURL=collaborators.service.js.map
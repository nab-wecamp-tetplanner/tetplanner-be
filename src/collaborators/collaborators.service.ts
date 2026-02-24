import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { CollaboratorRole, CollaboratorStatus } from '../helper/enums';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async checkAccess(userId: string, tetConfigId: string): Promise<void> {
    const tetConfig = await this.tetConfigRepository.findOne({
      where: { id: tetConfigId },
      relations: ['owner'],
    });
    if (!tetConfig) throw new NotFoundException('Tet config not found');
    if (tetConfig.owner.id === userId) return;

    const collab = await this.collaboratorRepository.findOne({
      where: { tet_config: { id: tetConfigId }, user: { id: userId }, status: CollaboratorStatus.ACCEPTED },
    });
    if (!collab) throw new ForbiddenException('Access denied');
  }

  private async checkOwner(userId: string, tetConfigId: string): Promise<void> {
    const tetConfig = await this.tetConfigRepository.findOne({
      where: { id: tetConfigId },
      relations: ['owner'],
    });
    if (!tetConfig) throw new NotFoundException('Tet config not found');
    if (tetConfig.owner.id !== userId) throw new ForbiddenException('Only the owner can manage collaborators');
  }

  async add(ownerId: string, createDto: CreateCollaboratorDto) {
    await this.checkOwner(ownerId, createDto.tet_config_id);

    const existing = await this.collaboratorRepository.findOne({
      where: { tet_config: { id: createDto.tet_config_id }, user: { email: createDto.user_email } },
    });
    if (existing) throw new ConflictException('User is already a collaborator');

    const collaborator = this.collaboratorRepository.create({
      role: createDto.role,
      status: CollaboratorStatus.PENDING,
      tet_config: { id: createDto.tet_config_id },
      user: { email: createDto.user_email },
    });
    const saved = await this.collaboratorRepository.save(collaborator);

    const tetConfig = await this.tetConfigRepository.findOne({ where: { id: createDto.tet_config_id } });
    await this.notificationsService.createForUser(createDto.user_email, `You've been invited to collaborate on "${tetConfig!.name}"`);

    return saved;
  }

  async accept(id: string, userId: string) {
    const collab = await this.collaboratorRepository.findOne({
      where: { id },
      relations: ['user', 'tet_config'],
    });
    if (!collab) throw new NotFoundException('Invitation not found');
    if (collab.user.id !== userId) throw new ForbiddenException('This invitation is not for you');
    if (collab.status !== CollaboratorStatus.PENDING) throw new ConflictException('Invitation is no longer pending');

    collab.status = CollaboratorStatus.ACCEPTED;
    collab.accepted_at = new Date();
    return this.collaboratorRepository.save(collab);
  }

  async decline(id: string, userId: string) {
    const collab = await this.collaboratorRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!collab) throw new NotFoundException('Invitation not found');
    if (collab.user.id !== userId) throw new ForbiddenException('This invitation is not for you');
    if (collab.status !== CollaboratorStatus.PENDING) throw new ConflictException('Invitation is no longer pending');

    await this.collaboratorRepository.remove(collab);
    return { message: 'Invitation declined' };
  }

  async getMyInvitations(userId: string) {
    return this.collaboratorRepository.find({
      where: { user: { id: userId }, status: CollaboratorStatus.PENDING },
      relations: ['tet_config', 'tet_config.owner'],
    });
  }

  async findAllByTetConfig(userId: string, tetConfigId: string) {
    await this.checkAccess(userId, tetConfigId);
    return this.collaboratorRepository.find({
      where: { tet_config: { id: tetConfigId } },
      relations: ['user'],
    });
  }

  async updateRole(id: string, ownerId: string, role: CollaboratorRole) {
    const collab = await this.collaboratorRepository.findOne({
      where: { id },
      relations: ['tet_config', 'tet_config.owner'],
    });
    if (!collab) throw new NotFoundException('Collaborator not found');
    if (collab.tet_config.owner.id !== ownerId) throw new ForbiddenException('Only the owner can update roles');
    collab.role = role;
    return this.collaboratorRepository.save(collab);
  }

  async remove(id: string, ownerId: string) {
    const collab = await this.collaboratorRepository.findOne({
      where: { id },
      relations: ['tet_config', 'tet_config.owner'],
    });
    if (!collab) throw new NotFoundException('Collaborator not found');
    if (collab.tet_config.owner.id !== ownerId) throw new ForbiddenException('Only the owner can remove collaborators');
    await this.collaboratorRepository.remove(collab);
    return { message: 'Collaborator removed successfully' };
  }
}

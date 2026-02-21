import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { CollaboratorRole } from '../helper/enums';

@Injectable()
export class CollaboratorsService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(TetConfig)
    private readonly tetConfigRepository: Repository<TetConfig>,
  ) {}

  async checkAccess(userId: string, tetConfigId: string): Promise<void> {
    const tetConfig = await this.tetConfigRepository.findOne({
      where: { id: tetConfigId },
      relations: ['owner'],
    });
    if (!tetConfig) throw new NotFoundException('Tet config not found');
    if (tetConfig.owner.id === userId) return;

    const collab = await this.collaboratorRepository.findOne({
      where: { tet_config: { id: tetConfigId }, user: { id: userId } },
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
      where: { tet_config: { id: createDto.tet_config_id }, user: { id: createDto.user_id } },
    });
    if (existing) throw new ConflictException('User is already a collaborator');
    const collaborator = this.collaboratorRepository.create({
      role: createDto.role,
      tet_config: { id: createDto.tet_config_id },
      user: { id: createDto.user_id },
    });
    return this.collaboratorRepository.save(collaborator);
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
      relations: ['tet_config', 'tet_config.owner'], // get owner id for permission check
    });
    if (!collab) throw new NotFoundException('Collaborator not found');
    if (collab.tet_config.owner.id !== ownerId) throw new ForbiddenException('Only the owner can remove collaborators');
    await this.collaboratorRepository.remove(collab);
    return { message: 'Collaborator removed successfully' };
  }
}

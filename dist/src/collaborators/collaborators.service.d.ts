import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { CollaboratorRole } from '../helper/enums';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CollaboratorsService {
    private readonly collaboratorRepository;
    private readonly tetConfigRepository;
    private readonly notificationsService;
    constructor(collaboratorRepository: Repository<Collaborator>, tetConfigRepository: Repository<TetConfig>, notificationsService: NotificationsService);
    checkAccess(userId: string, tetConfigId: string): Promise<void>;
    private checkOwner;
    add(ownerId: string, createDto: CreateCollaboratorDto): Promise<Collaborator>;
    accept(id: string, userId: string): Promise<Collaborator>;
    decline(id: string, userId: string): Promise<{
        message: string;
    }>;
    getMyInvitations(userId: string): Promise<Collaborator[]>;
    findAllByTetConfig(userId: string, tetConfigId: string): Promise<Collaborator[]>;
    updateRole(id: string, ownerId: string, role: CollaboratorRole): Promise<Collaborator>;
    remove(id: string, ownerId: string): Promise<{
        message: string;
    }>;
}

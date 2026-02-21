import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { TetConfig } from '../tet_configs/entities/tet_config.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { CollaboratorRole } from '../helper/enums';
export declare class CollaboratorsService {
    private readonly collaboratorRepository;
    private readonly tetConfigRepository;
    constructor(collaboratorRepository: Repository<Collaborator>, tetConfigRepository: Repository<TetConfig>);
    checkAccess(userId: string, tetConfigId: string): Promise<void>;
    private checkOwner;
    add(ownerId: string, createDto: CreateCollaboratorDto): Promise<Collaborator>;
    findAllByTetConfig(userId: string, tetConfigId: string): Promise<Collaborator[]>;
    updateRole(id: string, ownerId: string, role: CollaboratorRole): Promise<Collaborator>;
    remove(id: string, ownerId: string): Promise<{
        message: string;
    }>;
}

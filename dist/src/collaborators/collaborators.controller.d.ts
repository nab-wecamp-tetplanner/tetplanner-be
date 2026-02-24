import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import type { AuthRequest } from '../helper/interfaces/auth-request.interface';
export declare class CollaboratorsController {
    private readonly collaboratorsService;
    constructor(collaboratorsService: CollaboratorsService);
    add(req: AuthRequest, createDto: CreateCollaboratorDto): Promise<import("./entities/collaborator.entity").Collaborator>;
    getMyInvitations(req: AuthRequest): Promise<import("./entities/collaborator.entity").Collaborator[]>;
    findAll(req: AuthRequest, tetConfigId: string): Promise<{
        owner: {
            id: string;
            name: string;
            email: string;
        };
        collaborators: import("./entities/collaborator.entity").Collaborator[];
    }>;
    accept(id: string, req: AuthRequest): Promise<import("./entities/collaborator.entity").Collaborator>;
    decline(id: string, req: AuthRequest): Promise<{
        message: string;
    }>;
    updateRole(id: string, req: AuthRequest, updateDto: UpdateCollaboratorDto): Promise<import("./entities/collaborator.entity").Collaborator>;
    remove(id: string, req: AuthRequest): Promise<{
        message: string;
    }>;
}

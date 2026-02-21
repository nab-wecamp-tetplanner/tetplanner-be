import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
export declare class CollaboratorsController {
    private readonly collaboratorsService;
    constructor(collaboratorsService: CollaboratorsService);
    add(req: any, createDto: CreateCollaboratorDto): Promise<import("./entities/collaborator.entity").Collaborator>;
    findAll(req: any, tetConfigId: string): Promise<import("./entities/collaborator.entity").Collaborator[]>;
    updateRole(id: string, req: any, updateDto: UpdateCollaboratorDto): Promise<import("./entities/collaborator.entity").Collaborator>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}

import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
export declare class CollaboratorsController {
    private readonly collaboratorsService;
    constructor(collaboratorsService: CollaboratorsService);
    create(createCollaboratorDto: CreateCollaboratorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCollaboratorDto: UpdateCollaboratorDto): string;
    remove(id: string): string;
}

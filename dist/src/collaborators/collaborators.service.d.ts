import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
export declare class CollaboratorsService {
    create(createCollaboratorDto: CreateCollaboratorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCollaboratorDto: UpdateCollaboratorDto): string;
    remove(id: number): string;
}

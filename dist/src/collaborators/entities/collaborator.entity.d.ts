import { CollaboratorRole } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { User } from '../../users/entities/user.entity';
export declare class Collaborator {
    id: string;
    role: CollaboratorRole;
    accepted_at: Date;
    tet_config: TetConfig;
    user: User;
}

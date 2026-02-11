import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CollaboratorRole } from '../../helper/enums';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CollaboratorRole })
  role: CollaboratorRole;

  @Column('timestamp', { nullable: true })
  accepted_at: Date;

  // relationships => 2
  @Column('uuid')
  tet_config_id: string;

  @Column('uuid')
  user_id: string;
}

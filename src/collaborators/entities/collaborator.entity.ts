import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CollaboratorRole, CollaboratorStatus } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { User } from '../../users/entities/user.entity';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: CollaboratorRole })
  role: CollaboratorRole;

  @Column({ type: 'enum', enum: CollaboratorStatus, default: CollaboratorStatus.PENDING })
  status: CollaboratorStatus;

  @Column('timestamp', { nullable: true })
  accepted_at: Date;

  // relationships => 2
  @ManyToOne(() => TetConfig, (tet_config) => tet_config.collaborators)
  @JoinColumn({ name: 'tet_config_id' })
  tet_config: TetConfig;

  @ManyToOne(() => User, (user) => user.collaborators)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relations
  @OneToMany(() => TetConfig, (tet_config) => tet_config.owner)
  tet_configs: TetConfig[];

  @OneToMany(() => Collaborator, (collaborator) => collaborator.user, { cascade: ['remove'] })
  collaborators: Collaborator[];

  @OneToMany(() => Notification, (notification) => notification.user, { cascade: ['remove'] })
  notifications: Notification[];

  @OneToMany(() => TodoItem, (todo_item) => todo_item.assigned_to_user)
  assigned_todo_items: TodoItem[];

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.recorded_by_user)
  recorded_transactions: BudgetTransaction[];
}

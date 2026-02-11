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

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // Relations
  @OneToMany(() => TetConfig, (tetConfig) => tetConfig.owner)
  tetConfigs: TetConfig[];

  @OneToMany(() => Collaborator, (collaborator) => collaborator.user, { cascade: ['remove'] })
  collaborators: Collaborator[];

  @OneToMany(() => Notification, (notification) => notification.user, { cascade: ['remove'] })
  notifications: Notification[];

  @OneToMany(() => TodoItem, (todoItem) => todoItem.assignedToUser)
  assignedTodoItems: TodoItem[];

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.recordedByUser)
  recordedTransactions: BudgetTransaction[];
}

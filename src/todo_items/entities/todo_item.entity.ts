import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TodoPriority, TodoStatus } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TimelinePhase } from '../../timeline_phases/entities/timeline_phase.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('todo_items')
export class TodoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: TodoPriority, default: TodoPriority.MEDIUM })
  priority: TodoPriority;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.PENDING })
  status: TodoStatus;

  @Column('timestamp', { nullable: true })
  deadline: Date;

  @Column({ default: false })
  is_overdue: boolean;

  @Column({ default: false })
  is_shopping: boolean;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  estimated_price: number;

  @Column('int', { default: 1 })
  quantity: number;

  @Column({ default: false })
  purchased: boolean;

  @Column('uuid', { nullable: true })
  assigned_to: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relationships => 3
  @ManyToOne(() => TetConfig, (tetConfig) => tetConfig.todoItems)
  @JoinColumn({ name: 'tet_config_id' })
  tetConfig: TetConfig;

  @ManyToOne(() => TimelinePhase, (phase) => phase.todoItems)
  @JoinColumn({ name: 'timeline_phase_id' })
  timelinePhase: TimelinePhase;

  @ManyToOne(() => Category, (category) => category.todoItems)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.assignedTodoItems, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedToUser: User;

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.todoItem)
  budgetTransactions: BudgetTransaction[];

  @OneToMany(() => Notification, (notification) => notification.todoItem, { cascade: ['remove'] })
  notifications: Notification[];
}

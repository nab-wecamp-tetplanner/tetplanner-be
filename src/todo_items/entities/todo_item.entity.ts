import { AfterLoad, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TodoPriority, TodoStatus } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TimelinePhase } from '../../timeline_phases/entities/timeline_phase.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../users/entities/user.entity';
// not needed, transactions dont link to todo items anymore
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

  @Column({ type: 'jsonb', default: {} })
  subtasks: Record<string, boolean>;

  done_percentage: number;

  @AfterLoad()
  computeDonePercentage() {
    const entries = Object.keys(this.subtasks ?? {});
    if (entries.length === 0) {
      this.done_percentage = 0;
      return;
    }
    const done = Object.values(this.subtasks).filter(Boolean).length;
    this.done_percentage = Math.round((done / entries.length) * 100);
  }

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relationships => 3
  @ManyToOne(() => TetConfig, (tet_config) => tet_config.todo_items)
  @JoinColumn({ name: 'tet_config_id' })
  tet_config: TetConfig;

  @ManyToOne(() => TimelinePhase, (phase) => phase.todo_items)
  @JoinColumn({ name: 'timeline_phase_id' })
  timeline_phase: TimelinePhase;

  @ManyToOne(() => Category, (category) => category.todo_items)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.assigned_todo_items, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to_user: User;

  // drop this, transactions are standalone now
  @OneToMany(() => BudgetTransaction, (transaction) => transaction.todo_item)
  budget_transactions: BudgetTransaction[];

  @OneToMany(() => Notification, (notification) => notification.todo_item, { cascade: ['remove'] })
  notifications: Notification[];
}

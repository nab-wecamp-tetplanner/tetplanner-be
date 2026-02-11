import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { TimelinePhase } from '../../timeline_phases/entities/timeline_phase.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';
import { Collaborator } from '../../collaborators/entities/collaborator.entity';

@Entity('tet_configs')
export class TetConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  year: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  total_budget: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // relationships => 1
  @ManyToOne(() => User, (user) => user.tetConfigs)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Category, (category) => category.tetConfig, { cascade: ['remove'] })
  categories: Category[];

  @OneToMany(() => TimelinePhase, (phase) => phase.tetConfig, { cascade: ['remove'] })
  timelinePhases: TimelinePhase[];

  @OneToMany(() => TodoItem, (todo) => todo.tetConfig, { cascade: ['remove'] })
  todoItems: TodoItem[];

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.tetConfig, { cascade: ['remove'] })
  budgetTransactions: BudgetTransaction[];

  @OneToMany(() => Collaborator, (collaborator) => collaborator.tetConfig, { cascade: ['remove'] })
  collaborators: Collaborator[];
}

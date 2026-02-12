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
  @ManyToOne(() => User, (user) => user.tet_configs)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Category, (category) => category.tet_config, { cascade: ['remove'] })
  categories: Category[];

  @OneToMany(() => TimelinePhase, (phase) => phase.tet_config, { cascade: ['remove'] })
  timeline_phases: TimelinePhase[];

  @OneToMany(() => TodoItem, (todo) => todo.tet_config, { cascade: ['remove'] })
  todo_items: TodoItem[];

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.tet_config, { cascade: ['remove'] })
  budget_transactions: BudgetTransaction[];

  @OneToMany(() => Collaborator, (collaborator) => collaborator.tet_config, { cascade: ['remove'] })
  collaborators: Collaborator[];
}

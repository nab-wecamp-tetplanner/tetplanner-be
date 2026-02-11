import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { BudgetTransaction } from '../../budget_transactions/entities/budget_transaction.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: false })
  is_system: boolean;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  allocated_budget: number;

  @DeleteDateColumn()
  deleted_at: Date;

  // relationships => 1
  @ManyToOne(() => TetConfig, (tetConfig) => tetConfig.categories)
  @JoinColumn({ name: 'tet_config_id' })
  tetConfig: TetConfig;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.category, { cascade: ['remove'] })
  todoItems: TodoItem[];

  @OneToMany(() => BudgetTransaction, (transaction) => transaction.category, { cascade: ['remove'] })
  budgetTransactions: BudgetTransaction[];
}

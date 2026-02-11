import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { Category } from '../../categories/entities/category.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
import { User } from '../../users/entities/user.entity';

@Entity('budget_transactions')
export class BudgetTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ nullable: true })
  note: string;

  @Column('timestamp')
  transaction_date: Date;

  // relationships => 4
  @ManyToOne(() => TetConfig, (tetConfig) => tetConfig.budgetTransactions)
  @JoinColumn({ name: 'tet_config_id' })
  tetConfig: TetConfig;

  @ManyToOne(() => Category, (category) => category.budgetTransactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => TodoItem, (todoItem) => todoItem.budgetTransactions, { nullable: true })
  @JoinColumn({ name: 'todo_item_id' })
  todoItem: TodoItem;

  @ManyToOne(() => User, (user) => user.recordedTransactions)
  @JoinColumn({ name: 'recorded_by' })
  recordedByUser: User;
}

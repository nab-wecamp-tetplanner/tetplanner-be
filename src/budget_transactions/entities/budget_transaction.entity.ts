import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from '../../helper/enums';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
// not needed, transactions standalone now
import { Category } from '../../categories/entities/category.entity';
// not needed, transactions standalone now
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
// not needed, transactions standalone now
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

  @ManyToOne(() => TetConfig, (tet_config) => tet_config.budget_transactions)
  @JoinColumn({ name: 'tet_config_id' })
  tet_config: TetConfig;

  // drop this, categories only for shopping now
  @ManyToOne(() => Category, (category) => category.budget_transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // drop this, not linking transactions to todo items
  @ManyToOne(() => TodoItem, (todo_item) => todo_item.budget_transactions, { nullable: true })
  @JoinColumn({ name: 'todo_item_id' })
  todo_item: TodoItem;

  // drop this, dont need to track who recorded
  @ManyToOne(() => User, (user) => user.recorded_transactions)
  @JoinColumn({ name: 'recorded_by' })
  recorded_by_user: User;
}

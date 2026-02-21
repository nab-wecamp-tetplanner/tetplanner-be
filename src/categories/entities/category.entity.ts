import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';
// not needed, transactions dont have categories anymore
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
  @ManyToOne(() => TetConfig, (tet_config) => tet_config.categories)
  @JoinColumn({ name: 'tet_config_id' })
  tet_config: TetConfig;

  @OneToMany(() => TodoItem, (todo_item) => todo_item.category, { cascade: ['remove'] })
  todo_items: TodoItem[];

  // drop this, no more category on transactions
  @OneToMany(() => BudgetTransaction, (transaction) => transaction.category, { cascade: ['remove'] })
  budget_transactions: BudgetTransaction[];
}

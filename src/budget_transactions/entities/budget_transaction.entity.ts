import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TransactionType } from '../../helper/enums';

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
  @Column('uuid')
  tet_config_id: string;

  @Column('uuid')
  category_id: string;

  @Column('uuid', { nullable: true })
  todo_item_id: string;

  @Column('uuid')
  recorded_by: string;
}

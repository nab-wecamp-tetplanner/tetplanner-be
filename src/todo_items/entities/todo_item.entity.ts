import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TodoPriority, TodoStatus } from '../../helper/enums';

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

  // relationships => 3

  @Column('uuid')
  tet_config_id: string;

  @Column('uuid')
  timeline_phase_id: string;

  @Column('uuid')
  category_id: string;
}

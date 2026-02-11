import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TetConfig } from '../../tet_configs/entities/tet_config.entity';
import { TodoItem } from '../../todo_items/entities/todo_item.entity';

@Entity('timeline_phases')
export class TimelinePhase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @Column('int')
  display_order: number;

  // relationships => 1
  @ManyToOne(() => TetConfig, (tetConfig) => tetConfig.timelinePhases)
  @JoinColumn({ name: 'tet_config_id' })
  tetConfig: TetConfig;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.timelinePhase, { cascade: ['remove'] })
  todoItems: TodoItem[];
}

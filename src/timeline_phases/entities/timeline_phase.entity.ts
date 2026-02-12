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
  @ManyToOne(() => TetConfig, (tet_config) => tet_config.timeline_phases)
  @JoinColumn({ name: 'tet_config_id' })
  tet_config: TetConfig;

  @OneToMany(() => TodoItem, (todo_item) => todo_item.timeline_phase, { cascade: ['remove'] })
  todo_items: TodoItem[];
}

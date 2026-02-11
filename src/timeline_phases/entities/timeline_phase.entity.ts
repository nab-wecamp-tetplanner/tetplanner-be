import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  @Column('uuid')
  tet_config_id: string;
}

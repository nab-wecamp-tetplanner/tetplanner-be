import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  // relationships => 1
  @Column('uuid')
  owner_id: string;
}

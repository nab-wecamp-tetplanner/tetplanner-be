import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // relationships => 1
  @Column('uuid')
  tet_config_id: string;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * This is DieselEntry Entity Class
 */

@Entity()
export class DieselEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['IN', 'OUT'] })
  type: 'IN' | 'OUT';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column()
  siteName: string;

  @Column({ nullable: true })
  referenceNo?: string;

  @Column()
  entryDate: Date;

  @Column({ default: 'zoho' })
  source: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SYNCED', 'FAILED'],
    default: 'PENDING',
  })
  syncStatus: 'PENDING' | 'SYNCED' | 'FAILED';

  @CreateDateColumn()
  createdAt: Date;
}

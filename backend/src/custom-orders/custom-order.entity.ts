import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CustomOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerPhone: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', nullable: true })
  referenceImageUrl: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

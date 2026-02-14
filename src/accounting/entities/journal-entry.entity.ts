import { BaseEntity } from 'src/common/base.entity';
import { Tenant } from 'src/tenant/tenant.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { JournalLine } from './journal-line.entity';

@Entity('journal_entries')
export class JournalEntry extends BaseEntity {
  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  referenceType?: string; // invoice, payment, recognition

  @Column({ type: 'uuid', nullable: true })
  referenceId?: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @OneToMany(() => JournalLine, (line) => line.journalEntry, {
    cascade: true,
  })
  lines: JournalLine[];
}

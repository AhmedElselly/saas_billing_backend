import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Account } from './account.entity';
import { JournalEntry } from './journal-entry.entity';

@Entity('journal_lines')
export class JournalLine extends BaseEntity {
  @Column({ type: 'uuid' })
  accountId: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  debit: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  credit: string;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @ManyToOne(() => JournalEntry, (entry) => entry.lines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'journalEntryId' })
  journalEntry: JournalEntry;
}

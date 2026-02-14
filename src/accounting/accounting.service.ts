import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from './entities/journal-entry.entity';
import { DataSource, Repository } from 'typeorm';
import { JournalLine } from './entities/journal-line.entity';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly repo: Repository<JournalEntry>,
    private dataSource: DataSource,
  ) {}

  async createJournalEntry(
    tenantId: string,
    date: Date,
    referenceId: string,
    referenceType: string,
    lines: {
      accountId: string;
      debit?: string;
      credit?: string;
    }[],
  ) {
    // checking if debit equal to credit
    const totalDebit = lines.reduce(
      (total, line) => total + Number(line.debit || 0),
      0,
    );

    const totalCredit = lines.reduce(
      (total, line) => total + Number(line.credit || 0),
      0,
    );

    if (totalDebit !== totalCredit)
      throw new BadRequestException('Debits must equal credits!');

    // adding database process transaction for rollback
    return this.dataSource.transaction(async (manager) => {
      const entry = manager.create(JournalEntry, {
        tenantId,
        date,
        referenceId,
        referenceType,
      });

      await manager.save(entry);

      for (const line of lines) {
        const journalLine = manager.create(JournalLine, {
          tenantId,
          journalEntry: entry,
          accountId: line.accountId,
          debit: line.debit || '0',
          credit: line.credit || '0',
        });

        await manager.save(journalLine);
      }

      return entry;
    });
  }
}

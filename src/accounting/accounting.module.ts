import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { JournalLine } from './entities/journal-line.entity';
import { JournalEntry } from './entities/journal-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, JournalLine, JournalEntry])],
  providers: [AccountingService],
  controllers: [AccountingController],
})
export class AccountingModule {}

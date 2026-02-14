import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Customer } from 'src/customer/customer.entity';
import { Plan } from 'src/plan/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Customer, Plan])],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}

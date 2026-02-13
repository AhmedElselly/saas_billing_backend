import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/customer.entity';
import { BillingInterval, Plan } from 'src/plan/plan.entity';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Plan) private readonly planRepo: Repository<Plan>,
  ) {}

  async create(body: CreateSubscriptionDto, tenantId: string) {
    const customer = await this.customerRepo.findOne({
      where: {
        id: body.customerId,
        tenantId,
      },
    });

    if (!customer) throw new NotFoundException('Customer not found!');

    const plan = await this.planRepo.findOne({
      where: {
        id: body.planId,
        tenantId,
      },
    });

    if (!plan) throw new NotFoundException('Plan not found!');

    const now = new Date();

    let periodEnd = new Date(now);

    if (plan.billingInterval === BillingInterval.MONTHLY) {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    const subscription = this.subRepo.create({
      tenantId,
      customerId: customer.id,
      planId: plan.id,
      startDate: now,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
    });

    return this.subRepo.save(subscription);
  }

  async findAll(tenantId: string) {
    const subs = this.subRepo.find({
      where: {
        tenantId,
      },
      relations: ['customer', 'plan'],
      order: {
        createdAt: 'DESC',
      },
    });

    return subs;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './plan.entity';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dtos/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(@InjectRepository(Plan) private planRepo: Repository<Plan>) {}

  createPlan(body: CreatePlanDto, tenantId: string) {
    const plan = this.planRepo.create({ ...body, tenantId });
    return this.planRepo.save(plan);
  }

  findAll(tenantId: string) {
    const plans = this.planRepo.find({
      where: { tenantId },
      order: {
        createdAt: 'DESC',
      },
    });
    return plans;
  }

  findOne(id: string, tenantId: string) {
    const plan = this.planRepo.findOne({
      where: {
        id,
        tenantId,
      },
    });

    return plan;
  }

  async remove(id: string, tenantId: string) {
    const plan = await this.findOne(id, tenantId);
    if (!plan) return null;

    return this.planRepo.softRemove(plan);
  }
}

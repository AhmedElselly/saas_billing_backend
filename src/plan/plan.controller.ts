import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dtos/create-plan.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('/create')
  create(
    @Body() body: CreatePlanDto,
    @CurrentUser('tenantId') tenantId: string,
  ) {
    return this.planService.createPlan(body, tenantId);
  }

  @Get()
  findAll(@CurrentUser('tenantId') tenantId: string) {
    return this.planService.findAll(tenantId);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @CurrentUser('tenantId') tenantId: string) {
    return this.planService.remove(id, tenantId);
  }
}

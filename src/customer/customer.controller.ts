import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(
    @Body() dto: CreateCustomerDto,
    @CurrentUser('tenantId') tenantId: string,
  ) {
    return this.customerService.create(dto, tenantId);
  }

  @Get()
  findAll(@CurrentUser('tenantId') tenantId: string) {
    return this.customerService.findAll(tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('tenantId') tenantId: string) {
    return this.customerService.remove(id, tenantId);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { RegisterTenantDto } from './dto/create-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/register')
  register(@Body() body: RegisterTenantDto) {
    return this.tenantService.register(body);
  }
}

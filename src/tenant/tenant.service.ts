import { Injectable } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterTenantDto } from './dto/create-tenant.dto';
import bcrypt from 'bcrypt';
import { User, UserRole } from 'src/user/user.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepo: Repository<Tenant>,
    private dataSource: DataSource,
  ) {}

  async register(body: RegisterTenantDto) {
    // creating transaction for safe roll back if one of the entities failed being saved
    const { companyEmail, companyName, adminEmail, adminName, password } = body;
    return this.dataSource.transaction(async (manager) => {
      const tenant = manager.create(Tenant, {
        name: companyName,
        email: companyEmail,
      });

      await manager.save(tenant);

      const hashedPassword = await bcrypt.hash(password, 10);

      const adminUser = manager.create(User, {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
        tenantId: tenant.id,
        tenant: tenant,
      });

      await manager.save(adminUser);
      return {
        tenantId: tenant.id,
        adminUserId: adminUser.id,
      };
    });
  }
}

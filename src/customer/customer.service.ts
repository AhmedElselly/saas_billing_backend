import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private readonly repo: Repository<Customer>,
  ) {}

  create(body: CreateCustomerDto, tenantId: string) {
    const customer = this.repo.create({ ...body, tenantId });
    return customer;
  }

  findAll(tenantId: string) {
    const customers = this.repo.find({
      where: {
        tenantId,
      },
    });
    return customers;
  }

  findOne(id: string, tenantId: string) {
    const customer = this.repo.findOne({
      where: {
        id,
        tenantId,
      },
    });
    return customer;
  }

  async remove(id: string, tenantId: string) {
    const customer = await this.findOne(id, tenantId);
    if (!customer) return null;
    return this.repo.softRemove(customer);
  }
}

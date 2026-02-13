import { IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  planId: string;
}

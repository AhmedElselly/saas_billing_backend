import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { BillingInterval } from '../plan.entity';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumberString() // decimal is returned as string
  price: string;

  @IsEnum(BillingInterval)
  billingInterval: BillingInterval;
}

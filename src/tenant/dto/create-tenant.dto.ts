import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterTenantDto {
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  companyEmail: string;

  @IsNotEmpty()
  adminName: string;

  @IsEmail()
  adminEmail: string;

  @MinLength(6)
  password: string;
}

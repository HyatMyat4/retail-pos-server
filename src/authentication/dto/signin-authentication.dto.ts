import { IsString, IsEmail, IsEnum } from 'class-validator';
export class StaffSigninDto {
  @IsString()
  staff_name: string;
  @IsString()
  passcode: string;
}
export class SignupDto {
  @IsString()
  name: string;
  @IsString()
  company_name: string;
  @IsString()
  phone_number: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

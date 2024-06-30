import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
export class StaffSigninDto {
  @IsNotEmpty()
  @IsString()
  staff_name: string;
  @IsNotEmpty()
  @IsString()
  passcode: string;
}
export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  company_name: string;
  @IsNotEmpty()
  @IsString()
  phone_number: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AdminSigninDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ViladateUserDto extends AdminSigninDto {}

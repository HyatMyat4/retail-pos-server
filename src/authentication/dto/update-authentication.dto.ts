import { PartialType } from '@nestjs/mapped-types';
import { StaffSigninDto } from './signin-authentication.dto';

export class UpdateAuthenticationDto extends PartialType(StaffSigninDto) {}

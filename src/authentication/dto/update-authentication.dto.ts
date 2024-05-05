import { PartialType } from '@nestjs/mapped-types';
import { SigninDto } from './signin-authentication.dto';

export class UpdateAuthenticationDto extends PartialType(SigninDto) {}

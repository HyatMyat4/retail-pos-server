import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthServices: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    console.log('Inside LocalStrategy');
    const user = this.AuthServices.viladateUser({ email, password });

    if (!user) throw new UnauthorizedException('User not found.');

    return user;
  }
}

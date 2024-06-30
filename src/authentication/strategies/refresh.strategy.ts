import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authServices: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ingnoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRECT}`,
    });
  }
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}

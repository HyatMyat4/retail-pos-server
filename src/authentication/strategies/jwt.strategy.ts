import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authServices: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ingnoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRECT}`,
    });
  }
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}

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
      secretOrKey: `4c43a6f71bea35c9073f3c55655278452952ca96e0d36a0349c94573af20ab9970a5034e0c0f927738f52f4eb1373caf781127d7908b26bd97eeb279ce57fa6c`,
    });
  }
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}

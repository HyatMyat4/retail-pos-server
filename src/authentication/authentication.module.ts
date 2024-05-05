import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    JwtModule.register({
      secret:
        '4c43a6f71bea35c9073f3c55655278452952ca96e0d36a0349c94573af20ab9970a5034e0c0f927738f52f4eb1373caf781127d7908b26bd97eeb279ce57fa6c',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}

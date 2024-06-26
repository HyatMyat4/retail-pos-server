import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemModule } from './item/item.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CompanyModule } from './company/company.module';
import { DatabaseService } from './database/database.service';
import { CompanyService } from './company/company.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    DatabaseModule,
    ItemModule,
    AuthenticationModule,
    LoggerModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,
        limit: 8,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 20,
      },
    ]),
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AuthenticationService,
    JwtService,
    DatabaseService,
    CompanyService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, JwtService],
})
export class CompanyModule {}

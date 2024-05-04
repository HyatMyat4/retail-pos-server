import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [DatabaseModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

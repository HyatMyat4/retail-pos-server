import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}

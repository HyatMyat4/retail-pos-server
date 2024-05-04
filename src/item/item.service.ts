import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  create(createItemDto: Prisma.itemCreateInput) {
    return this.DatabaseService.item.create({ data: createItemDto });
    //'This action adds a new item';
  }

  async findAll(id: number) {
    const result = await this.DatabaseService.item.findMany({
      where: {
        company_id: id,
      },
    });

    return result || [];
    // `This action returns all item`;
  }

  findOne(id: number) {
    return this.DatabaseService.item.findUnique({
      where: {
        id: id,
      },
    });
    // `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: Prisma.itemUpdateInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyService {
  constructor(
    private readonly DatabaseService: DatabaseService,
    private JwtService: JwtService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const createCompanyResult = await this.DatabaseService.$transaction(
      async (prisma) => {
        return await prisma.company.create({
          data: {
            user_id: createCompanyDto?.user_id,
            company_name: createCompanyDto?.company_name,
          },
        });
      },
    );
    if (!createCompanyResult)
      throw new BadRequestException('Failed to create new company data.');

    return { message: 'ok', result: createCompanyResult };
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

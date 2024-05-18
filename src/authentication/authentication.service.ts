import { Injectable } from '@nestjs/common';
import { StaffSigninDto, SignupDto } from './dto/signin-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { DatabaseService } from 'src/database/database.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  createSignIn(createSigninDto: StaffSigninDto) {
    return 'This action adds a new authentication';
  }
  async createSignUp(createSignupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(createSignupDto?.password, 15);

    const createResponse = await this.DatabaseService.user.create({
      data: {
        name: createSignupDto?.name,
        email: createSignupDto?.email,
        phone_number: createSignupDto?.phone_number,
        password: hashedPassword,
      },
    });
    if (!createResponse)
      throw new InternalServerErrorException('Failed to create user.');

    return createResponse;
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}

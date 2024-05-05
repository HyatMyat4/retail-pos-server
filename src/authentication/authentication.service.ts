import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/signin-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  createSignIn(createSigninDto: SigninDto) {
    return 'This action adds a new authentication';
  }
  async createSignUp(createSignupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(createSignupDto?.password, 20);

    const createResponse = await this.DatabaseService.user.create({
      data: {
        name: createSignupDto?.name,
        email: createSignupDto?.email,
        phone_number: +createSignupDto?.phone_number,
        password: hashedPassword,
      },
    });
    return 'This action adds a new authentication';
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

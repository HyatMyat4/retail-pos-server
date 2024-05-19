import { Injectable } from '@nestjs/common';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  SignupDto,
  StaffSigninDto,
  AdminSigninDto,
  ViladateUserDto,
} from './dto/signin-authentication.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly DatabaseService: DatabaseService,
    private JwtService: JwtService,
  ) {}

  staffSignIn(staffSignIn: StaffSigninDto) {
    return 'This action adds a new authentication';
  }

  async adminSignIn(adminSignInDto: AdminSigninDto) {
    console.log(adminSignInDto, '# AdminSignInDto');
    console.log('In Case....');
    const user = await this.DatabaseService.user.findUnique({
      where: {
        email: adminSignInDto?.email,
      },
    });
    const payload = {
      id: user?.id,
      email: user?.email,
    };

    return {
      ...user,
      accessToken: this.JwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: this.JwtService.sign(payload, { expiresIn: '7d' }),
    };
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

  async viladateUser(viladateUserDto: ViladateUserDto) {
    console.log('In Case....');
    const user = await this.DatabaseService.user.findUnique({
      where: {
        email: viladateUserDto?.email,
      },
    });
    if (user && bcrypt.compare(viladateUserDto?.password, user?.password)) {
      delete user.password;
      delete user.refresh_token;
      return user;
    }
    return null;
  }
}

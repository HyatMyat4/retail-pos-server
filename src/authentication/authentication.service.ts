import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { DatabaseService } from '../database/database.service';
import {
  faileToCreateMessage,
  dataNotFoundMessage,
} from '../utils/errorMessages';
import { CompanyService } from '../company/company.service';
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
    private readonly databaseService: DatabaseService,
    private readonly companyService: CompanyService,
    private JwtService: JwtService,
  ) {}

  staffSignIn(staffSignIn: StaffSigninDto) {
    return 'This action adds a new authentication';
  }

  async adminSignIn(adminSignInDto: AdminSigninDto) {
    console.log(adminSignInDto, '# AdminSignInDto');
    console.log('In Case....');
    const user = await this.viladateUser(adminSignInDto);
    console.log(user, '** **');
    if (!user) return new NotFoundException(dataNotFoundMessage('User'));

    const payload = {
      id: user?.id,
      email: user?.email,
    };

    return {
      ...user,
      message: 'ok',
      accessToken: this.JwtService.sign(payload, { expiresIn: '30m' }),
      refreshToken: this.JwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async createSignUp(createSignupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(createSignupDto?.password, 15);

    const createUserResult = await this.databaseService.$transaction(
      async (prisma) => {
        return await prisma.user.create({
          data: {
            name: createSignupDto.name,
            email: createSignupDto.email,
            phone_number: createSignupDto.phone_number,
            password: hashedPassword,
          },
        });
      },
    );

    delete createUserResult.password;

    if (!createUserResult)
      return new InternalServerErrorException(faileToCreateMessage('User'));

    const createCompany: { message: string; result: any } | any =
      await this.companyService.create({
        user_id: createUserResult?.id,
        company_name: createSignupDto?.company_name,
      });

    if (createCompany?.message !== 'ok') {
      await this.databaseService.user.delete({
        where: {
          id: +createUserResult?.id,
        },
      });
      return new InternalServerErrorException(faileToCreateMessage('Company'));
    }

    return {
      message: 'ok',
      userResult: createUserResult,
      companyResult: createCompany?.result,
    };
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
    const user = await this.databaseService.user.findUnique({
      where: {
        email: viladateUserDto?.email,
      },
    });
    const compareResult = await bcrypt.compare(
      viladateUserDto?.password,
      user?.password,
    );
    if (user && compareResult) {
      delete user.password;
      delete user.refresh_token;
      return user;
    }
    return null;
  }
}

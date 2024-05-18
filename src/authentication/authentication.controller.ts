import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { StaffSigninDto, SignupDto } from './dto/signin-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('staff-signin')
  createSignin(@Body() createSigninDto: StaffSigninDto) {
    return this.authenticationService.createSignIn(createSigninDto);
  }

  @Post('signup')
  async createSignup(@Body(ValidationPipe) createSignupDto: SignupDto) {
    return await this.authenticationService.createSignUp(createSignupDto);
  }

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  ) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}

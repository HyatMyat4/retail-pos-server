import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  StaffSigninDto,
  AdminSigninDto,
  SignupDto,
} from './dto/signin-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';

import { LocalGuard } from './guards/local.auth.guard';

@Controller('/v1/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('staff-signin')
  staffSignIn(@Body() staffSignIn: StaffSigninDto) {
    return this.authenticationService.staffSignIn(staffSignIn);
  }

  @Post('admin-signin')
  @UseGuards(LocalGuard)
  adminSignIn(@Request() req) {
    console.log(req?.user);
    console.log('In Case...');
    return req.user;
    //this.authenticationService.adminSignIn(req.user);
  }

  @Post('signup')
  async createSignup(@Body() createSignupDto: SignupDto) {
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

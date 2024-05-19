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
import { ValidationPipe } from '@nestjs/common';
import { LocalGuard } from './guards/local.auth.guard';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('staff-signin')
  staffSignIn(@Body(ValidationPipe) staffSignIn: StaffSigninDto) {
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

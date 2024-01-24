import { Controller, Body, Post, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Request } from 'express';
import { GetUser } from './decoratos/get-user.decorator';
import { User } from './entities/user.entity';
import { GetRawHeaders } from './decoratos/get-raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders: string[]
  ) {
    return {
      ok: true,
      message: "Hola mundo private",
      user,
      userEmail,
      rawHeaders
    };
  }

  @Get('private-2')
  @SetMetadata('roles', ['admin', 'super-use'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRouteWithRoles(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }
}

import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { GetUser } from './decoratos/get-user.decorator';
import { User } from './entities/user.entity';
import { GetRawHeaders } from './decoratos/get-raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decoratos/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decoratos/auth.decorator';

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
  // @SetMetadata('roles', ['admin', 'super-use'])
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRouteWithRoles(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }

  @Get('private-3')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  testingPrivateRouteWithRolesDefinitive(
    @GetUser() user: User
  ) {
    return {
      ok: true,
      user
    }
  }
}

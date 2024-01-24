import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get('roles', context.getHandler()); // Obtener los datos de @SetMetadata
    const user = context.switchToHttp().getRequest().user as User;

    if (!user)
      throw new BadRequestException('User not found');

    if (!user.roles.some(r => validRoles.includes(r)))
      throw new ForbiddenException(`User ${user.fullName} needs a valid role [${validRoles.join()}]`);

    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoles } from './user.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.headers.id) {
      const id = request.headers.id;
      const user = await this.userService.buscarId(id);
      return user.roles === UserRoles.ADMIN;
    }

    return false;
  }
}

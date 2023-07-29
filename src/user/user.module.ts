import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

@Module({
  imports: [AuthModule],
  providers: [UserService, AuthService, AdminRoleGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

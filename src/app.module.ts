import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdmModule } from './adm/adm.module';
import { LojaModule } from './loja/loja.module';
import { ProdutoModule } from './produto/produto.module';
import { RodapeModule } from './rodape/rodape.module';
import { AuthModule } from './auth/auth.module';
import { UserRoleGuard } from './auth/guards/admin-role.guard';

@Module({
  imports: [
    UserModule,
    UserModule,
    AdmModule,
    LojaModule,
    ProdutoModule,
    RodapeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRoleGuard],
})
export class AppModule {}

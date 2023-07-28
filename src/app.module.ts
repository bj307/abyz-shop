import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdmModule } from './adm/adm.module';
import { LojaModule } from './loja/loja.module';

@Module({
  imports: [UserModule, UserModule, AdmModule, LojaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GaleriaController } from './galeria.controller';
import { GaleriaService } from './galeria.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GaleriaController],
  providers: [GaleriaService],
})
export class GaleriaModule {}

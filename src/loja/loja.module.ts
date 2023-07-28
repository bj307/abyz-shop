import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';

@Module({
  providers: [LojaService],
  controllers: [LojaController]
})
export class LojaModule {}

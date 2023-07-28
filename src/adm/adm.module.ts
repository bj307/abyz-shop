import { Module } from '@nestjs/common';
import { AdmService } from './adm.service';
import { AdmController } from './adm.controller';

@Module({
  providers: [AdmService],
  controllers: [AdmController]
})
export class AdmModule {}

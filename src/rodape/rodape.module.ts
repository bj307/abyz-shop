import { Module } from '@nestjs/common';
import { RodapeController } from './rodape.controller';
import { RodapeService } from './rodape.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RodapeController],
  providers: [RodapeService],
})
export class RodapeModule {}

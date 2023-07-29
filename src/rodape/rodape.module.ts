import { Module } from '@nestjs/common';
import { RodapeController } from './rodape.controller';
import { RodapeService } from './rodape.service';

@Module({
  controllers: [RodapeController],
  providers: [RodapeService]
})
export class RodapeModule {}

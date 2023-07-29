import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RodapeService } from './rodape.service';
import { RodapeDTO } from './DTO/rodape.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('rodape')
@UseGuards(AuthGuard('jwt'))
export class RodapeController {
  constructor(private readonly rodapeService: RodapeService) {}

  @Post('novo')
  public async criar(@Body() r: RodapeDTO): Promise<string> {
    const rodape = await this.rodapeService.criar(r);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Get(':id')
  public async buscarId(@Param('id') id: string): Promise<RodapeDTO> {
    const rodape = await this.rodapeService.buscarId(id);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Put(':id')
  public async atualizar(
    @Param('id') id: string,
    @Body() r: RodapeDTO,
  ): Promise<string> {
    const rodape = await this.rodapeService.atualizar(id, r);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Delete(':id')
  public async deletar(@Param('id') id: string) {
    return await this.rodapeService.deletar(id);
  }
}

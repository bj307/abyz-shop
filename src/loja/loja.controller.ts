import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaDTO } from './DTO/loja.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post('nova')
  @UseInterceptors(FileInterceptor('logo'))
  public async criar(
    @Body() l: LojaDTO,
    @UploadedFile() logo: any,
  ): Promise<string> {
    const filePath = `lojas/usuario/${logo.originalname}`;
    const loja = await this.lojaService.criar(l, filePath, logo.buffer);

    if (!logo || !logo.buffer) {
      throw new Error('Nenhum arquivo de logo foi enviado.');
    }

    return loja;
  }

  @Get(':id')
  public async buscarId(@Param('id') id: string): Promise<LojaDTO> {
    const loja = await this.lojaService.buscarId(id);

    if (!loja) {
      return;
    }

    return loja;
  }

  @Delete(':id')
  public async deletar(@Param('id') id: string) {
    const urlImage = await this.buscarId(id);
    return await this.lojaService.removeImageToStorage(urlImage.path);
  }
}

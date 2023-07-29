import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaDTO } from './DTO/loja.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/model/jwtpayload.model';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';

@Controller('loja')
@UseGuards(AuthGuard('jwt'))
export class LojaController {
  constructor(
    private readonly lojaService: LojaService,
    private readonly authService: AuthService,
  ) {}

  @Post('nova')
  @UseInterceptors(FileInterceptor('logo'))
  public async criar(
    @Request() req,
    @Body() l: LojaDTO,
    @UploadedFile() logo: any,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const filePath = `lojas/usuario/${logo.originalname}`;
    const loja = await this.lojaService.criar(l, filePath, logo.buffer);

    if (!logo || !logo.buffer) {
      throw new Error('Nenhum arquivo de logo foi enviado.');
    }

    return loja;
  }

  @Get(':id')
  public async buscarId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<LojaDTO> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const loja = await this.lojaService.buscarId(id);

    if (!loja) {
      return;
    }

    return loja;
  }

  @Delete(':id')
  public async deletar(@Request() req, @Param('id') id: string) {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const urlImage = await this.buscarId(req, id);
    return await this.lojaService.removeImageToStorage(urlImage.path);
  }
}

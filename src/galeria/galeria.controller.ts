import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GaleriaService } from './galeria.service';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtPayload } from 'src/auth/model/jwtpayload.model';
import { verify } from 'jsonwebtoken';
import { FotoDTO } from './DTO/foto.dto';

@Controller('galeria')
@UseGuards(AuthGuard('jwt'))
export class GaleriaController {
  constructor(
    private readonly galeriaService: GaleriaService,
    private readonly authService: AuthService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('foto'))
  public async upload(
    @Request() req,
    @UploadedFile() foto: any,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    if (!foto || !foto.buffer) {
      throw new Error('Nenhum arquivo de logo foi enviado.');
    }

    const filePath = `usuario/galeria/${foto.originalname}`;
    const imagem = await this.galeriaService.upload(
      filePath,
      foto.buffer,
      jwtPay.userId,
    );

    return imagem;
  }

  @Get(':id')
  public async buscarId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<FotoDTO> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const foto = await this.galeriaService.buscarId(id);

    if (!foto) {
      return;
    }

    return foto;
  }

  @Get()
  public async buscar(@Request() req): Promise<FotoDTO[]> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const fotos = await this.galeriaService.buscar(jwtPay.userId);

    if (!fotos) {
      return;
    }

    return fotos;
  }

  @Delete(':id')
  public async delete(@Request() req, @Param('id') id: string) {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const urlImage = await this.galeriaService.buscarId(id);
    return await this.galeriaService.deletar(id, urlImage.path);
  }
}

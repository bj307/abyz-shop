import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/model/jwtpayload.model';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDTO } from './DTO/avaliacao.dto';

@Controller('avaliacao')
@UseGuards(AuthGuard('jwt'))
export class AvaliacaoController {
  constructor(
    private readonly avaliacaoService: AvaliacaoService,
    private readonly authService: AuthService,
  ) {}

  @Post('nova')
  @UseInterceptors(FileInterceptor('foto'))
  public async criar(
    @Request() req,
    @Body() a: AvaliacaoDTO,
    @UploadedFile() foto: any,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const filePath = `avaliacoes/${jwtPay.userId}/${foto.originalname}`;
    const loja = await this.avaliacaoService.criar(
      a,
      filePath,
      foto.buffer,
      jwtPay.userId,
    );

    if (!foto || !foto.buffer) {
      throw new Error('Nenhum arquivo foi enviado.');
    }

    return loja;
  }

  @Get(':id')
  public async buscarId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<AvaliacaoDTO> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const avaliacao = await this.avaliacaoService.buscarId(id);

    if (!avaliacao) {
      return;
    }

    return avaliacao;
  }

  @Get()
  public async buscarTodos(@Request() req): Promise<AvaliacaoDTO[]> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const avaliacoes = await this.avaliacaoService.buscarTodos(jwtPay.userId);

    if (!avaliacoes) {
      return;
    }

    return avaliacoes;
  }

  @Delete(':id')
  public async deletar(@Request() req, @Param('id') id: string) {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const urlImage = await this.buscarId(req, id);
    return await this.avaliacaoService.deletar(id, urlImage.path);
  }
}

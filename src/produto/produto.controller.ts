import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDTO } from './DTO/produto.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/model/jwtpayload.model';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';

@Controller('produto')
@UseGuards(AuthGuard('jwt'))
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly authService: AuthService,
  ) {}

  @Post('novo')
  public async cadastro(
    @Request() req,
    @Body() p: ProdutoDTO,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const produto = await this.produtoService.cadastro(p);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Get(':id')
  public async buscarId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<ProdutoDTO> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const produto = await this.produtoService.buscarId(id);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Put(':id')
  public async atualizar(
    @Request() req,
    @Param('id') id: string,
    @Body() p: ProdutoDTO,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const produto = await this.produtoService.atualizar(id, p);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Delete(':id')
  public async deletar(@Request() req, @Param('id') id: string) {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    return await this.produtoService.deletar(id);
  }
}

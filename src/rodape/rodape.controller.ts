import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RodapeService } from './rodape.service';
import { RodapeDTO } from './DTO/rodape.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from 'src/auth/model/jwtpayload.model';
import { verify } from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';

@Controller('rodape')
@UseGuards(AuthGuard('jwt'))
export class RodapeController {
  constructor(
    private readonly rodapeService: RodapeService,
    private readonly authService: AuthService,
  ) {}

  @Post('novo')
  public async criar(@Request() req, @Body() r: RodapeDTO): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const rodape = await this.rodapeService.criar(r);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Get(':id')
  public async buscarId(
    @Request() req,
    @Param('id') id: string,
  ): Promise<RodapeDTO> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const rodape = await this.rodapeService.buscarId(id);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Put(':id')
  public async atualizar(
    @Request() req,
    @Param('id') id: string,
    @Body() r: RodapeDTO,
  ): Promise<string> {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    const rodape = await this.rodapeService.atualizar(id, r);

    if (!rodape) {
      return;
    }

    return rodape;
  }

  @Delete(':id')
  public async deletar(@Request() req, @Param('id') id: string) {
    const jwtToken = await this.authService.jwtExtractor(req);
    const jwtPay = verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    await this.authService.validateUser(jwtPay);

    return await this.rodapeService.deletar(id);
  }
}

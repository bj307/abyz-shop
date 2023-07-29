import { Controller, Post, Body } from '@nestjs/common';
import { AdmService } from './adm.service';
import { AdmDTO } from './DTO/adm.dto';
import { LoginADM } from './DTO/login.dto';

@Controller('adm')
export class AdmController {
  constructor(private readonly admService: AdmService) {}

  @Post('novo')
  public async adm(@Body() a: AdmDTO): Promise<string> {
    const adm = await this.admService.adm(a);

    return adm;
  }

  @Post('login')
  public async login(
    @Body() l: LoginADM,
  ): Promise<{ id: string; nome: string; email: string }> {
    return await this.admService.login(l);
  }
}

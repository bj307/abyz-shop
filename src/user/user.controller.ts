import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CadastroDTO } from './DTO/cadastro.dto';
import { LoginDTO } from './DTO/login.dto';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { ShowDTO } from './DTO/show.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDTO } from './DTO/update.dto';
import { LimitsDTO } from './DTO/limits.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('novo')
  @UseGuards(AdminRoleGuard)
  public async cadastro(@Body() u: CadastroDTO): Promise<string> {
    const user = await this.userService.cadastro(u);

    if (!user) {
      return;
    }

    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  public async buscarId(@Param('id') id: string): Promise<ShowDTO> {
    const user = await this.userService.show(id);

    if (!user) {
      return;
    }

    return user;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  public async updateUser(
    @Param('id') id: string,
    @Body() u: UpdateDTO,
  ): Promise<any> {
    const usuario = await this.userService.updateUser(id, u);
    return usuario;
  }

  @Put()
  public async update(
    @Query('id') id: string,
    @Body() l: LimitsDTO,
  ): Promise<any> {
    const usuario = await this.userService.update(id, l);

    return usuario;
  }

  @Post('login')
  public async login(
    @Body() login: LoginDTO,
  ): Promise<{ id: string; nome: string; jwtToken: string; email: string }> {
    return await this.userService.login(login);
  }
}

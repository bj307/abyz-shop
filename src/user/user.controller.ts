import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTO/user.dto';
import { CadastroDTO } from './DTO/cadastro.dto';
import { LoginDTO } from './DTO/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('novo')
  public async cadastro(@Body() u: CadastroDTO): Promise<string> {
    const user = await this.userService.cadastro(u);

    if (!user) {
      return;
    }

    return user;
  }

  @Get(':id')
  public async buscarId(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.buscarId(id);

    if (!user) {
      return;
    }

    return user;
  }

  @Get()
  public async buscarEmail(@Query('email') email: string): Promise<UserDTO> {
    const user = await this.userService.buscarEmail(email);

    if (!user) {
      return;
    }

    console.log(user);
    return user;
  }

  @Post('login')
  public async login(
    @Body() login: LoginDTO,
  ): Promise<{ id: string; nome: string; jwtToken: string; email: string }> {
    return await this.userService.login(login);
  }
}

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDTO } from './DTO/produto.dto';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/guards/role.enum';

@Controller('produto')
@Roles(Role.Admin)
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('novo')
  public async cadastro(@Body() p: ProdutoDTO): Promise<string> {
    const produto = await this.produtoService.cadastro(p);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Get(':id')
  public async buscarId(@Param('id') id: string): Promise<ProdutoDTO> {
    const produto = await this.produtoService.buscarId(id);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Put(':id')
  public async atualizar(
    @Param('id') id: string,
    @Body() p: ProdutoDTO,
  ): Promise<string> {
    const produto = await this.produtoService.atualizar(id, p);

    if (!produto) {
      return;
    }

    return produto;
  }

  @Delete(':id')
  public async deletar(@Param('id') id: string) {
    return await this.produtoService.deletar(id);
  }
}

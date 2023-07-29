import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDTO } from './DTO/produto.dto';

@Controller('produto')
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
}

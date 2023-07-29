import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class ProdutoDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @IsString({ message: 'Nome é do tipo string' })
  nome: string;

  @IsNotEmpty({ message: 'O campo preco é obrigatório' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(99999.99)
  preco: number;

  @IsNotEmpty({ message: 'O campo precoPromo é obrigatório' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(99999.99)
  precoPromo: number;

  @IsNotEmpty({ message: 'O campo descricao é obrigatório' })
  @IsString({ message: 'Descrição é do tipo string' })
  descricao: string;

  // @IsNotEmpty({ message: 'O campo fotoPrincipal é obrigatório' })
  // fotoPrincipal: string;

  // @IsNotEmpty({ message: 'O campo foto2 é obrigatório' })
  // foto2: string;

  // @IsNotEmpty({ message: 'O campo foto3 é obrigatório' })
  // foto3: string;

  // @IsNotEmpty({ message: 'O campo foto4 é obrigatório' })
  // foto4: string;

  @IsNotEmpty({ message: 'O campo loja é obrigatório' })
  @IsString({ message: 'Loja é do tipo string' })
  loja: string;

  @IsNotEmpty({ message: 'O campo rodape é obrigatório' })
  @IsString({ message: 'Rodapé é do tipo string' })
  rodape: string;

  @IsNotEmpty({ message: 'O campo botao é obrigatório' })
  @IsString({ message: 'Botão é do tipo string' })
  botao: string;

  @IsString({ message: 'Avaliações é do tipo string' })
  avaliacao?: string;
}

import {
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

export class ProdutoDTO {
  id?: string;

  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
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
  descricao: string;

  @IsNotEmpty({ message: 'O campo loja é obrigatório' })
  loja: string;

  @IsNotEmpty({ message: 'O campo rodape é obrigatório' })
  rodape: string;

  @IsNotEmpty({ message: 'O campo botao é obrigatório' })
  botao: string;

  @ArrayMaxSize(6)
  @ArrayMinSize(0)
  avaliacao?: string[];

  userId: string;

  @ArrayMaxSize(6)
  fotos: string[];
}

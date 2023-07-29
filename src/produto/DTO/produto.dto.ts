import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { LojaDTO } from 'src/loja/DTO/loja.dto';

export class ProdutoDTO {
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(99999.99)
  preco: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(99999.99)
  precoPromo: number;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  fotoPrincipal: string;

  @IsString()
  @IsArray()
  fotosExtra?: string[];

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  rodape: string;

  @IsNotEmpty()
  @IsString()
  botao: string;

  @IsString()
  avaliacao?: string;
}

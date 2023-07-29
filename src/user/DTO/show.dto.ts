import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { LojaDTO } from 'src/loja/DTO/loja.dto';

export class ShowDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;

  @IsOptional()
  @IsString()
  apiChat?: string;

  @IsOptional()
  @ArrayMaxSize(3)
  loja?: LojaDTO[];

  @IsOptional()
  @IsArray()
  produtos?: string[];

  @IsOptional()
  @ArrayMaxSize(3)
  avaliacoes?: string[];

  @IsOptional()
  @ArrayMaxSize(3)
  rodape?: string[];
}

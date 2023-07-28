import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';
import { LojaDTO } from 'src/loja/DTO/loja.dto';

export class UserDTO {
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
  @IsArray()
  loja?: LojaDTO[];

  @IsOptional()
  @IsArray()
  produtos?: string[];

  @IsOptional()
  @IsArray()
  avaliacoes?: string[];

  @IsOptional()
  @IsArray()
  rodape?: string[];
}

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Exclude } from 'class-transformer';
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
  @IsString()
  @Exclude()
  password: string;

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

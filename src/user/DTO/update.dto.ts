import { IsEmail, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { LojaDTO } from 'src/loja/DTO/loja.dto';

export class UpdateDTO {
  @IsOptional()
  nome?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
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

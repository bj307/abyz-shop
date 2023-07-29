import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RodapeDTO {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  endereco: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  uf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  whatsapp: string;

  @IsNotEmpty()
  loja: string;
}

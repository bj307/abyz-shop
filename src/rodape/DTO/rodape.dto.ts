import { IsEmail, IsNotEmpty } from 'class-validator';

export class RodapeDTO {
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

  userId: string;
}

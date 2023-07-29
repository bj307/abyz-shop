import { IsNotEmpty, IsString } from 'class-validator';

export class LojaDTO {
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}

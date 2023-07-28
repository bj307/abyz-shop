import { IsNotEmpty, IsString } from 'class-validator';

export class LojaDTO {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}

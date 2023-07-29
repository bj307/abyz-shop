import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './model/jwtpayload.model';
import { UserDTO } from 'src/user/DTO/user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<UserDTO> {
    const usuario = await this.userService.buscarId(jwtPayload.userId);
    if (!usuario) {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    return usuario;
  }

  public async jwtExtractor(request: Request) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request. Token inválido!');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  private static jwtExtractorr(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad request. Token inválido!');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return AuthService.jwtExtractorr;
  }
}

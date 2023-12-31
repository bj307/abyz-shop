import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CadastroDTO } from './DTO/cadastro.dto';
import { UserDTO } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './DTO/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { ShowDTO } from './DTO/show.dto';
import { UserRoles } from '../auth/guards/user.enum';
import { UpdateDTO } from './DTO/update.dto';
import { LimitsDTO } from './DTO/limits.dto';

@Injectable()
export class UserService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    this.db = admin.firestore();
  }

  private collection = 'User';
  private collect = 'Person';

  async cadastro(u: CadastroDTO): Promise<string> {
    try {
      u.roles = UserRoles.MEMBER;
      u.password = await bcrypt.hash(u.password, 10);
      const user: any = await this.db.collection(this.collection).add(u);

      const person = {
        id: user.id,
        roles: u.roles,
      };

      await this.db.collection(this.collect).add(person);

      return user.id;
    } catch (error) {
      throw new Error('Erro ao criar o documento: ' + error.message);
    }
  }

  async buscarId(id: string): Promise<UserDTO> {
    try {
      const userRef = this.db.collection(this.collection).doc(id);
      const user: any = await userRef.get();
      if (!user) {
        return;
      }

      const userDTO: UserDTO = {
        id: user.id,
        nome: user.data().nome,
        cpf: user.data().cpf,
        email: user.data().email,
        password: user.data().password,
        ativo: user.data().ativo,
        roles: user.data().roles,
      };

      return userDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async buscarRoles(id: string): Promise<string> {
    try {
      const personRef = this.db.collection(this.collect);
      const snapshot = await personRef.where('id', '==', id).get();
      if (snapshot.empty) {
        console.log('User não encontrado.');
        return;
      }

      return snapshot.docs[0].data().roles;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async show(id: string): Promise<ShowDTO> {
    try {
      const userRef = this.db.collection(this.collection).doc(id);
      const user: any = await userRef.get();
      if (!user) {
        return;
      }

      const userDTO: ShowDTO = {
        id: user.id,
        nome: user.data().nome,
        cpf: user.data().cpf,
        email: user.data().email,
        ativo: user.data().ativo,
      };

      return userDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async updateUser(id: string, u: UpdateDTO): Promise<any> {
    try {
      const usuario = await this.db.collection(this.collection).doc(id);
      const res = await usuario.set(
        {
          u,
        },
        { merge: true },
      );

      return res;
    } catch (error) {
      throw new Error('Erro ao atualizar o documento: ' + error.message);
    }
  }

  async update(id: string, l: LimitsDTO): Promise<any> {
    try {
      const usuario = await this.db.collection(this.collection).doc(id);
      const res = await usuario.set(
        {
          l,
        },
        { merge: true },
      );
      const person = await this.db.collection(this.collect).doc(id);
      await person.set(
        {
          roles: l.roles,
        },
        { merge: true },
      );

      return res;
    } catch (error) {
      throw new Error('Erro ao atualizar o documento: ' + error.message);
    }
  }

  async login(
    login: LoginDTO,
  ): Promise<{ id: string; nome: string; jwtToken: string; email: string }> {
    const user = await this.buscarEmail(login.email);
    const valid = await this.checkPassword(login.password, user);

    if (!valid) {
      throw new NotFoundException('Credenciais inválidas.');
    }

    const jwtToken = await this.authService.createAccessToken(user.id);
    return {
      id: user.id,
      nome: user.nome,
      jwtToken,
      email: user.email,
    };
  }

  private async buscarEmail(email: string): Promise<UserDTO> {
    try {
      const usersRef = this.db.collection(this.collection);
      const snapshot = await usersRef.where('email', '==', email).get();
      if (snapshot.empty) {
        console.log('User não encontrado.');
        return;
      }

      const userDTO: UserDTO =
        snapshot.docs.length > 0
          ? {
              id: snapshot.docs[0].id,
              nome: snapshot.docs[0].data().nome,
              cpf: snapshot.docs[0].data().cpf,
              email: snapshot.docs[0].data().email,
              password: snapshot.docs[0].data().password,
              ativo: snapshot.docs[0].data().ativo,
              roles: snapshot.docs[0].data().roles,
            }
          : null;

      return userDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  private async checkPassword(
    password: string,
    user: UserDTO,
  ): Promise<boolean> {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new NotFoundException('Senha inválida.');
    }

    return valid;
  }
}

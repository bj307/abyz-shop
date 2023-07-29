import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { AdmDTO } from './DTO/adm.dto';
import { UserRoles } from '../auth/guards/user.enum';
import { LoginADM } from './DTO/login.dto';

@Injectable()
export class AdmService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private collection = 'Adm';
  private collect = 'Person';

  async adm(a: AdmDTO): Promise<string> {
    try {
      a.roles = UserRoles.ADMIN;
      a.password = await bcrypt.hash(a.password, 10);

      const adm: any = await this.db.collection(this.collection).add(a);

      const person = {
        id: adm.id,
        roles: a.roles,
      };

      await this.db.collection(this.collect).add(person);

      return adm.id;
    } catch (error) {
      throw new Error('Erro ao criar o documento: ' + error.message);
    }
  }

  async login(
    login: LoginADM,
  ): Promise<{ id: string; nome: string; email: string }> {
    const user = await this.buscarEmail(login.email);
    const valid = await this.checkPassword(login.password, user);

    if (!valid) {
      throw new NotFoundException('Credenciais inválidas.');
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }

  private async buscarEmail(email: string): Promise<AdmDTO> {
    try {
      const usersRef = this.db.collection(this.collection);
      const snapshot = await usersRef.where('email', '==', email).get();
      if (snapshot.empty) {
        console.log('User não encontrado.');
        return;
      }

      const admDTO: AdmDTO =
        snapshot.docs.length > 0
          ? {
              id: snapshot.docs[0].id,
              nome: snapshot.docs[0].data().nome,
              email: snapshot.docs[0].data().email,
              password: snapshot.docs[0].data().password,
              roles: snapshot.docs[0].data().roles,
            }
          : null;

      return admDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  private async checkPassword(
    password: string,
    user: AdmDTO,
  ): Promise<boolean> {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new NotFoundException('Senha inválida.');
    }

    return valid;
  }
}

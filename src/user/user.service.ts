import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CadastroDTO } from './DTO/cadastro.dto';
import { UserDTO } from './DTO/user.dto';

@Injectable()
export class UserService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private collection = 'User';

  async cadastro(u: CadastroDTO): Promise<string> {
    try {
      const user: any = await this.db.collection(this.collection).add(u);

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
        nome: user._fieldsProto.nome.stringValue,
        cpf: user._fieldsProto.cpf.stringValue,
        email: user._fieldsProto.email.stringValue,
        ativo: user._fieldsProto.ativo.booleanValue,
      };

      return userDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }
}

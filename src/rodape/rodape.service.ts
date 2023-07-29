import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { RodapeDTO } from './DTO/rodape.dto';

@Injectable()
export class RodapeService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private readonly collection = 'Rodape';

  async criar(r: RodapeDTO): Promise<string> {
    try {
      const rodape: any = await this.db.collection(this.collection).add(r);

      return rodape.id;
    } catch (error) {
      throw new Error('Erro ao criar o documento: ' + error.message);
    }
  }

  async buscarId(id: string): Promise<RodapeDTO> {
    try {
      const rodapeRef = this.db.collection(this.collection).doc(id);
      const rodape: any = await rodapeRef.get();

      if (!rodape) {
        return;
      }

      const rodapeDTO: RodapeDTO = {
        id: rodape.id,
        cnpj: rodape._fieldsProto.cnpj.stringValue,
        endereco: rodape._fieldsProto.endereco.stringValue,
        cep: rodape._fieldsProto.cep.stringValue,
        cidade: rodape._fieldsProto.cidade.stringValue,
        uf: rodape._fieldsProto.uf.stringValue,
        email: rodape._fieldsProto.email.stringValue,
        whatsapp: rodape._fieldsProto.whatsapp.stringValue,
        loja: rodape._fieldsProto.loja.stringValue,
      };

      return rodapeDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async atualizar(id: string, r: RodapeDTO): Promise<string> {
    try {
      const rodape: any = await this.db
        .collection(this.collection)
        .doc(id)
        .set(r);

      return rodape.id;
    } catch (error) {
      throw new Error('Erro ao atualizar o documento: ' + error.message);
    }
  }

  async deletar(id: string) {
    try {
      await this.db.collection(this.collection).doc(id).delete();
    } catch (error) {
      throw new Error('Erro ao excluir o documento: ' + error.message);
    }
  }
}

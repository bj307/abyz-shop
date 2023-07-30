import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AvaliacaoDTO } from './DTO/avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly storage: admin.storage.Storage;

  constructor() {
    this.db = admin.firestore();
    this.storage = admin.storage();
  }

  private readonly collection = 'Avaliacoes';
  private readonly bucket = 'prodshop-28ebe.appspot.com';

  async criar(
    a: AvaliacaoDTO,
    filePath: string,
    file: Buffer,
    user: string,
  ): Promise<string> {
    try {
      const avaliacaoUrl = await this.saveImageToStorage(filePath, file);
      a.userId = user;
      a.foto = avaliacaoUrl;
      a.path = filePath;
      const loja: any = await this.db.collection(this.collection).add(a);

      return loja.id;
    } catch (error) {
      throw new Error('Erro ao criar o documento: ' + error.message);
    }
  }

  async saveImageToStorage(filePath: string, file: Buffer): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucket);
      const fileRef = bucket.file(filePath);
      await fileRef.save(file);
      const url = await fileRef.getSignedUrl({
        action: 'read',
        expires: '01-01-2500',
      });

      return url[0];
    } catch (error) {
      throw new Error('Erro ao salvar a imagem no Storage: ' + error.message);
    }
  }

  async removeImageToStorage(path: string) {
    try {
      const fileRef = admin.storage().bucket(this.bucket).file(path);

      console.log(fileRef);
      fileRef.delete();
    } catch (error) {
      throw new Error('Erro ao remover o documento: ' + error.message);
    }
  }

  async buscarId(id: string): Promise<AvaliacaoDTO> {
    try {
      const avaliacaoRef = this.db.collection(this.collection).doc(id);
      const avaliacao: any = await avaliacaoRef.get();
      if (!avaliacao) {
        return;
      }

      const avaliacaoDTO: AvaliacaoDTO = {
        id: avaliacao.id,
        cliente: avaliacao.data().cliente,
        texto: avaliacao.data().texto,
        foto: avaliacao.data().foto,
        path: avaliacao.data().path,
        userId: avaliacao.data().userId,
      };

      return avaliacaoDTO;
    } catch (error) {}
  }

  async buscarTodos(id: string): Promise<AvaliacaoDTO[]> {
    try {
      const avaliacaoRef = this.db.collection(this.collection);
      const snapshot = await avaliacaoRef.where('userId', '==', id).get();
      const avaliacoes: AvaliacaoDTO[] = [];
      snapshot.forEach((doc: any) => {
        const a: AvaliacaoDTO = {
          id: doc.id,
          cliente: doc.data().cliente,
          foto: doc.data().foto,
          path: doc.data().path,
          texto: doc.data().texto,
          userId: doc.data().userId,
        };
        avaliacoes.push(a);
      });

      return avaliacoes;
    } catch (error) {}
  }

  async deletar(id: string, path: string) {
    try {
      await this.db.collection(this.collection).doc(id).delete();
      await this.removeImageToStorage(path);
    } catch (error) {
      throw new Error('Erro ao excluir o documento: ' + error.message);
    }
  }
}

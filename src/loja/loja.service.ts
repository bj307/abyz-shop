import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { LojaDTO } from './DTO/loja.dto';

@Injectable()
export class LojaService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly storage: admin.storage.Storage;

  constructor() {
    this.db = admin.firestore();
    this.storage = admin.storage();
  }

  private readonly collection = 'Loja';
  private readonly bucket = 'prodshop-28ebe.appspot.com';

  async criar(l: LojaDTO, filePath: string, file: Buffer): Promise<string> {
    try {
      const logoUrl = await this.saveImageToStorage(filePath, file);
      l.logo = logoUrl;
      const loja: any = await this.db.collection(this.collection).add(l);

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

  async buscarId(id: string): Promise<LojaDTO> {
    try {
      const lojaRef = this.db.collection(this.collection).doc(id);
      const loja: any = await lojaRef.get();
      if (!loja) {
        return;
      }

      const lojaDTO: LojaDTO = {
        id: loja.id,
        nome: loja._fieldsProto.nome.stringValue,
        logo: loja._fieldsProto.logo.stringValue,
      };

      return lojaDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }
}

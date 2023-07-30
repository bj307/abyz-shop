import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FotoDTO } from './DTO/foto.dto';

@Injectable()
export class GaleriaService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly storage: admin.storage.Storage;

  constructor() {
    this.db = admin.firestore();
    this.storage = admin.storage();
  }

  private readonly collection = 'Galeria';
  private readonly bucket = 'prodshop-28ebe.appspot.com';

  async upload(filePath: string, file: Buffer, user: string): Promise<string> {
    try {
      const fotoUrl = await this.saveImageToStorage(filePath, file);
      const f: FotoDTO = {
        imagem: fotoUrl,
        path: filePath,
        userId: user,
      };

      const foto: any = await this.db.collection(this.collection).add(f);
      return foto.id;
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

  async buscarId(id: string): Promise<FotoDTO> {
    try {
      const fotoRef = this.db.collection(this.collection).doc(id);
      const foto = await fotoRef.get();
      if (!foto) {
        return;
      }

      const fotoDTO: FotoDTO = {
        id: foto.id,
        imagem: foto.data().imagem,
        path: foto.data().path,
        userId: foto.data().userId,
      };

      return fotoDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async buscar(user: string): Promise<FotoDTO[]> {
    try {
      const galeriaRef = this.db.collection(this.collection);
      const fotosDTO: FotoDTO[] = [];
      const fotos = await galeriaRef.where('userId', '==', user).get();
      fotos.forEach((doc: any) => {
        const f: FotoDTO = {
          id: doc.id,
          imagem: doc.data().imagem,
          path: doc.data().path,
          userId: doc.data().userId,
        };
        fotosDTO.push(f);
      });

      return fotosDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async deletar(id: string, path: string) {
    try {
      await this.db.collection(this.collection).doc(id).delete();
      await this.removeImageToStorage(path);
    } catch (error) {
      throw new Error('Erro ao excluir o documento: ' + error.message);
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
}

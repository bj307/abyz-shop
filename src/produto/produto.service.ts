import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProdutoDTO } from './DTO/produto.dto';

@Injectable()
export class ProdutoService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly storage: admin.storage.Storage;

  constructor() {
    this.db = admin.firestore();
    this.storage = admin.storage();
  }

  private collection = 'Produto';
  private readonly bucket = 'prodshop-28ebe.appspot.com';

  async cadastro(p: ProdutoDTO): Promise<string> {
    try {
      const produto: any = await this.db.collection(this.collection).add(p);

      return produto.id;
    } catch (error) {
      throw new Error('Erro ao criar o documento: ' + error.message);
    }
  }

  async buscarId(id: string): Promise<ProdutoDTO> {
    try {
      const produtoRef = this.db.collection(this.collection).doc(id);
      const produto: any = await produtoRef.get();
      if (!produto) {
        return;
      }

      const produtoDTO: ProdutoDTO = {
        id: produto.id,
        nome: produto._fieldsProto.nome.stringValue,
        preco: produto._fieldsProto.preco.stringValue,
        precoPromo: produto._fieldsProto.precoPromo.stringValue,
        descricao: produto._fieldsProto.descricao.stringValue,
        loja: produto._fieldsProto.logo.stringValue,
        rodape: produto._fieldsProto.rodape.stringValue,
        botao: produto._fieldsProto.botao.stringValue,
        avaliacao: produto._fieldsProto.avaliacao.stringValue,
      };

      return produtoDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }

  async atualizar(id: string, p: ProdutoDTO): Promise<string> {
    try {
      const produto: any = await this.db
        .collection(this.collection)
        .doc(id)
        .set(p);
      return produto.id;
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
}

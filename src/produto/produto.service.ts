import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProdutoDTO } from './DTO/produto.dto';

@Injectable()
export class ProdutoService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  private collection = 'Produto';

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
        fotoPrincipal: produto._fieldsProto.fotoPrincipal.stringValue,
        fotosExtra: produto._fieldsProto.fotosExtra.arrayValue.values.map(
          (item) => item.stringValue,
        ),
        logo: produto._fieldsProto.logo.stringValue,
        rodape: produto._fieldsProto.rodape.stringValue,
        botao: produto._fieldsProto.botao.stringValue,
        avaliacao: produto._fieldsProto.avaliacao.stringValue,
      };

      return produtoDTO;
    } catch (error) {
      throw new Error('Erro ao buscar o documento: ' + error.message);
    }
  }
}

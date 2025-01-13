import { Anunciante } from "src/app/myProfile/model/anunciante"
import { Categoria } from "src/app/shared/model/categoria"
import { Localizacao } from "src/app/shared/model/localizacao"

export interface Anuncio{
  id_anuncio?:number,
  tipo: string,
  descricao: string,
  preco: number,
  foto: string,
  categoria: number,
  condicao_produto: string,
  avaliacao?: number,
  anunciante: number,
  comprador?: number,
  local: number
}

export interface ListarAnuncio{
  id_anuncio: number,
  tipo: string,
  descricao: string,
  preco: number,
  foto: string,
  categoria: Categoria,
  condicao_produto: string,
  avaliacao: number,
  anunciante: Anunciante,
  comprador: string,
  local: Localizacao,
  status: boolean
}


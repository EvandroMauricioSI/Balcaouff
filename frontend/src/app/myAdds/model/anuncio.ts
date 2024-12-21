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

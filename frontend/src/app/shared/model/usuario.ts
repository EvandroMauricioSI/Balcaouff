export interface Usuario{
  email: string,
  senha: string,
  nome?: string | null,
  ocupacao?: string | null,
  telefone?: string | null,
  foto_de_perfil?: string| null
}

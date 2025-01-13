export interface Usuario{
  email: string,
  senha: string,
  nome?: string | null,
  ocupacao?: string | null,
  telefone?: string | null,
  foto_de_perfil?: string| null
}


export interface Autenticacao{
  admin_usuario: boolean,
  exp: string,
  id_usuario: number,
  message: string,
  token: string
}

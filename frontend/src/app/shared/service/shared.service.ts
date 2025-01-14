import { Localizacao } from './../model/localizacao';
import { ResponseAPI } from './../model/responseAPI';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autenticacao, Usuario } from '../model/usuario';
import { map, take } from 'rxjs';
import { loginUser } from '../model/loginUsuario';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(
  private http: HttpClient
) { }


  cadastrarUsuario(formulario:Usuario){
    return this.http.post(`/api/usuarios/cadastrar`, formulario) //, { responseType: 'text' }
    .pipe(
      map((val) => val),
      take(1)
    );
  }

  loginUsuario(formulario:Usuario){
    console.log('shared service')
    console.log(formulario)
    return this.http.post<ResponseAPI<loginUser>>(`/api/usuarios/login`, formulario)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  obterUsuario(){
    const user = localStorage.getItem('usuario')
    return JSON.parse(user!)
  }

  listarCategoria(){
    return this.http.get<ResponseAPI<Categoria[]>>(`api/categorias/`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  cadastrarCategoria(objeto: any){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.post<ResponseAPI<any>>(`api/categorias/`, objeto, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  atualizarCategoria(objeto: any, id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.put<ResponseAPI<any>>(`api/categorias/${id}`, objeto, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  excluirCategoria(id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.delete<ResponseAPI<any>>(`api/categorias/${id}`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  listarLocalizacao(){
    return this.http.get<ResponseAPI<Localizacao[]>>(`api/localizacao/`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  cadastrarLocalizacao(objeto: any){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.post<ResponseAPI<Localizacao[]>>(`api/localizacao/`, objeto, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  atualizarLocalizacao(objeto: any, id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.put<ResponseAPI<Localizacao[]>>(`api/localizacao/${id}`, objeto, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  excluirLocalizacao(id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.delete<ResponseAPI<Localizacao[]>>(`api/localizacao/${id}`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }


  getIDusuario(){
    const user:Autenticacao = this.obterUsuario()
    return  user ? user.id_usuario : 0
  }

  getTokenUsuario(){
    const user:Autenticacao = this.obterUsuario()
    return user ? user.token : ""
  }

  getAdmin(){
    const user:Autenticacao = this.obterUsuario()
    return user ? user.admin_usuario : false
  }

  listarAnunciantes(){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.get<ResponseAPI<any[]>>(`/api/usuarios/listar`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  excluirAnunciantes(id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.delete<ResponseAPI<any[]>>(`api/usuarios/admin/remover/${id}`, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

  promoverAdministrador(id:number){

    const PARAMS = new HttpParams().set(
      "token", this.getTokenUsuario()
    )

    return this.http.put<ResponseAPI<any[]>>(`api/usuarios/admin/atualizar/${id}/${true}`,'',{
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }

}



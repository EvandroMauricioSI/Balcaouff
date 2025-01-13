import { Localizacao } from './../model/localizacao';
import { ResponseAPI } from './../model/responseAPI';
import { HttpClient } from '@angular/common/http';
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

  listarLocalizacao(){
    return this.http.get<ResponseAPI<Localizacao[]>>(`api/localizacao/`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  getIDusuario(){
    const user:Autenticacao = this.obterUsuario()
    return user.id_usuario
  }

  getTokenUsuario(){
    const user:Autenticacao = this.obterUsuario()
    return user.token
  }

}



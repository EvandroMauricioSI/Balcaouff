import { ResponseAPI } from './../../shared/model/responseAPI';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";
import { Anuncio } from '../model/anuncio';

@Injectable({
  providedIn: 'root'
})
export class MyAddsService {

constructor(
  private http: HttpClient
) { }


  listarAnuncioUsuario(id:number){
    return this.http.get<ResponseAPI<Anuncio[]>>(`api/anuncios/usuario/${id}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  cadastrarAnuncio(formulario:Anuncio){
    return this.http.post<ResponseAPI<any>>(`api/anuncios/`, formulario)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  atualizarCadastroAnuncio(formulario:Anuncio, id:number){
    return this.http.put<ResponseAPI<any>>(`api/anuncios/${id}`, formulario)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  excluirAnuncio(id:number){
    return this.http.delete<ResponseAPI<any>>(`api/anuncios/${id}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }



}



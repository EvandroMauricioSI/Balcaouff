import { SharedService } from 'src/app/shared/service/shared.service';
import { ResponseAPI } from './../../shared/model/responseAPI';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, switchMap, take } from "rxjs";
import { Anuncio, ListarAnuncio } from '../model/anuncio';

@Injectable({
  providedIn: 'root'
})
export class MyAddsService {
  idUser:number = this.shared.getIDusuario()

constructor(
  private http: HttpClient,
  private shared: SharedService
) { }

listarTodosAnuncios(id:number){
  return this.http.get<ResponseAPI<ListarAnuncio[]>>(`api/anuncios/ativos`)
  .pipe(
    map((val) => val.data),
    map((val) => val.filter((dado)=> dado.anunciante.id != id)),
    take(1)
  );
}


  listarAnuncioUsuario(id:number){
    return this.http.get<ResponseAPI<ListarAnuncio[]>>(`api/anuncios/usuario/${id}`)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  listarAnuncioComprado(id:number){
    return this.http.get<ResponseAPI<ListarAnuncio[]>>(`api/anuncios/`)
    .pipe(
      map((val) => val.data),
      map((val) => val.filter((dado)=> +dado.comprador?.id == id)),
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


  avaliarAnuncio(id:number, avaliacao:number){
    const submit = {
      avaliacao: avaliacao
    }

    return this.http.put<ResponseAPI<any>>(`/api/anuncios/${id}/avaliar`, submit)
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  comprarAnuncio(id:number){
    const user = {
      usuario: this.idUser
    }

    const PARAMS = new HttpParams().set(
      "usuario", this.idUser
    )

    return this.http.put<ResponseAPI<any>>(`/api/anuncios/${id}/comprar`, user, {
      params: PARAMS
    })
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }



}



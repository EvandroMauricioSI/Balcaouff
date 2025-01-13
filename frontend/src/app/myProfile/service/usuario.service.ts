import { take } from 'rxjs';
import { SharedService } from './../../shared/service/shared.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ResponseAPI } from 'src/app/shared/model/responseAPI';
import { Anunciante } from '../model/anunciante';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = this.service?.getTokenUsuario()

  constructor(
    private http: HttpClient,
    private service: SharedService
  ) { }



  listarUsuario(id:number){
    const PARAMS = new HttpParams().set(
      "token", this.token
    ).set(
      "id", id
    )

    return this.http.get<ResponseAPI<Anunciante>>(`api/usuarios/listar`,{ params: PARAMS})
    .pipe(
      map((val) => val.data),
      take(1)
    );
  }

  atualizarUsuario(dado:any){
    const PARAMS = new HttpParams().set(
      "token", this.token
    )

    return this.http.put<ResponseAPI<Anunciante>>(`api/usuarios/`,dado, {params: PARAMS})
    .pipe(
      map((val) => val.data),
      take(1)
    );

  }


}

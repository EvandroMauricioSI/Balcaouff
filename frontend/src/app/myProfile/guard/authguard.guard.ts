import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  permissao!:any

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const user = localStorage.getItem('usuario');

    if (user) {
      this.permissao = JSON.parse(user)
      if(this.permissao.data == 'Bem vindo, novo usuario!'){ //GUARDAR A ROTA PELO ID DO MELIANTE
        return true;
      } else {
        this.router.navigate(['/perfil']);
        return false
      }
    } else {
      this.router.navigate(['/perfil']);
      return false;
    }
  }
}

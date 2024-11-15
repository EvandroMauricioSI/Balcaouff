import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa o Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) { }  // Injeta o Router no componente

  onLogin() {
    // Simula uma ação de login e redireciona para a página Home
    this.router.navigate(['/home']);  // Redireciona para a rota 'home'
  }
}

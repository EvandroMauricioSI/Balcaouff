import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Importa o componente de login
import { HomeComponent } from './home/home.component';    // Importa o componente de home

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Rota para o componente de login
  { path: 'home', component: HomeComponent },    // Rota para o componente de home
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redireciona para login ao acessar a raiz
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Redireciona para login se a rota não existir
];



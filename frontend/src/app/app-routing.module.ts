import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/authguard.guard';


const routes: Routes = [

  {path:'home', loadChildren:()=> import('./homePage/home-page.module').then(m=> m.HomePageModule), canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'perfil', loadChildren:()=> import('./myProfile/myProfile.module').then(m=> m.MyProfileModule), canActivate: [AuthGuard]},
  {path: 'meusAnuncios', loadChildren:()=> import('./myAdds/myAdds.module').then(m=> m.MyAddsModule), canActivate: [AuthGuard]},
  {path: 'categoria', loadChildren:()=> import('./shared/component/categoria/categoria.module').then(m=> m.CategoriaModule), canActivate: [AuthGuard]},
  {path: 'localizacao', loadChildren:()=> import('./shared/component/localizacao/localizacao.module').then(m=> m.LocalizacaoModule), canActivate: [AuthGuard]},
  {path: 'controleUsuarios', loadChildren:()=> import('./shared/component/controleUsuario/controle-usuario.module').then(m=> m.ControleUsuarioModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

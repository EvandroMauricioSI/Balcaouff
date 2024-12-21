import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/authguard.guard';


const routes: Routes = [

  {path:'',component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'perfil', loadChildren:()=> import('./myProfile/myProfile.module').then(m=> m.MyProfileModule), canActivate: [AuthGuard]},
  {path: 'meusAnuncios', loadChildren:()=> import('./myAdds/myAdds.module').then(m=> m.MyAddsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

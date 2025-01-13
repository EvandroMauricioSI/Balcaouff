import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ControleUsuarioComponent } from "./controleUsuario.component";




const routes: Routes = [
  { path: '', component:ControleUsuarioComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControleUsuarioRoutingModule { }

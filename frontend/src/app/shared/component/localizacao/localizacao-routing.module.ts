import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LocalizacaoComponent } from "./localizacao.component";



const routes: Routes = [
  { path: '', component:LocalizacaoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizacaoRoutingModule { }

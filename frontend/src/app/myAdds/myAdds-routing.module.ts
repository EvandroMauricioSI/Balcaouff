import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyAddsComponent } from "./myAdds.component";



const routes: Routes = [
  { path: '', component:MyAddsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAddsRoutingModule { }

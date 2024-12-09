import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guard/authguard.guard";
import { MyProfileEditComponent } from "./myProfile-edit/myProfile-edit.component";
import { MyProfileComponent } from "./myProfile.component";


const routes: Routes = [
  { path: '', component:MyProfileComponent },
  { path: ':id', component:MyProfileEditComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfiledRoutingModule { }

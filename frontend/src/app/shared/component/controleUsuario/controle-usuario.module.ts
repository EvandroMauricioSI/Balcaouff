import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/angular-material/material.module';
import { ControleUsuarioRoutingModule } from './controleUsuario-routing.module';
import { ControleUsuarioComponent } from './controleUsuario.component';



@NgModule({
  declarations: [
    ControleUsuarioComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ControleUsuarioRoutingModule
  ]
})
export class ControleUsuarioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/angular-material/material.module';
import { LocalizacaoRoutingModule } from './localizacao-routing.module';
import { LocalizacaoComponent } from './localizacao.component';


@NgModule({
  declarations: [
    LocalizacaoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LocalizacaoRoutingModule
  ]
})
export class LocalizacaoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { AnuncioDetalhadoComponent } from './anuncioDetalhado/anuncioDetalhado.component';
import { HomePageComponent } from './homePage.component';
import { MandarEmailComponent } from './mandarEmail/mandarEmail.component';
import { HomePageRoutingModule } from './homePage-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    MandarEmailComponent,
    AnuncioDetalhadoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    FormsModule
  ]
})
export class HomePageModule { }

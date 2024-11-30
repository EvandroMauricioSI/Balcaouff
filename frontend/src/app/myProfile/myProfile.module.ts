import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './myProfile.component';
import { MyProfiledRoutingModule } from './myProfile-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MyProfiledRoutingModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [MyProfileComponent]
})
export class MyProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAddsComponent } from './myAdds.component';
import { MyAddsRoutingModule } from './myAdds-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.module';
import { MyAddsService } from './service/myAdds.service';
import { MyAddsEditComponent } from './myAddsEdit/myAddsEdit.component';

@NgModule({
  imports: [
    CommonModule,
    MyAddsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    MyAddsComponent,
    MyAddsEditComponent
  ]
})
export class MyAddsModule { }

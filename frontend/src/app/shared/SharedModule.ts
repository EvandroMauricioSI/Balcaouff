import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../angular-material/material.module";
import { DialogExcluirComponent } from "./component/dialogExcluir/dialogExcluir.component";
import { NavegacaoComponent } from "../navegacao/navegacao.component";
import { DialogGenericoComponent } from "./dialogGenerico/dialogGenerico.component";
import { UploadArquivoComponent } from "./component/uploadArquivo/uploadArquivo.component";
import { UploadArquivoTabelaComponent } from "./component/uploadArquivo/uploadArquivo-tabela/uploadArquivo-tabela.component";



@NgModule({
  declarations: [
    DialogExcluirComponent,
    DialogGenericoComponent,
    UploadArquivoComponent,
    UploadArquivoTabelaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogExcluirComponent,
    DialogGenericoComponent,
    UploadArquivoComponent,
    UploadArquivoTabelaComponent
  ]
})
export class SharedModule {
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../angular-material/material.module";
import { CategoriaComponent } from "./component/categoria/categoria.component";
import { ControleUsuarioComponent } from "./component/controleUsuario/controleUsuario.component";
import { DialogExcluirComponent } from "./component/dialogExcluir/dialogExcluir.component";
import { LocalizacaoComponent } from "./component/localizacao/localizacao.component";
import { UploadArquivoTabelaComponent } from "./component/uploadArquivo/uploadArquivo-tabela/uploadArquivo-tabela.component";
import { UploadArquivoComponent } from "./component/uploadArquivo/uploadArquivo.component";
import { DialogGenericoComponent } from "./dialogGenerico/dialogGenerico.component";




@NgModule({
  declarations: [
    DialogExcluirComponent,
    DialogGenericoComponent,
    UploadArquivoComponent,
    UploadArquivoTabelaComponent,
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

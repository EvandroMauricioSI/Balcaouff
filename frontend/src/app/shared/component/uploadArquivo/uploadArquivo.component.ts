import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { UploadArquivoTabelaComponent } from './uploadArquivo-tabela/uploadArquivo-tabela.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Arquivo } from '../../model/arquivo';

@Component({
  selector: 'app-uploadArquivo',
  templateUrl: './uploadArquivo.component.html',
  styleUrls: ['./uploadArquivo.component.css']
})
export class UploadArquivoComponent implements OnInit {

  total!:number

  texto!:string

  progresso$!:any

  @Input()
  requiredFileType!:string;

  carregando:boolean = false

  @ViewChild(UploadArquivoTabelaComponent)tabela!:UploadArquivoTabelaComponent

  fileName = '';
  uploadProgress!:number;
  uploadSub!: Subscription;
  listaDearquivos:any[] = []
  base64!:string | undefined
  envioArquivo$!: Subscription
  progresso!: any[];

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<UploadArquivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    console.log('abri file selected')

    const files: FileList = event.target.files;

    console.log('debug file', files)

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      console.log(file);
      const tipo = file.type;
      console.log(tipo);
      this.fileName = file.name;
      const extensao = this.retornaExtensao(file.name)
      console.log(extensao?.toLowerCase())

      if (file.size > 5000000) {
        this.toast.error(`Arquivo deve ser menor do que 5MB - ${file.name}`);
      }
      else if(extensao?.toLowerCase() != 'jpg' && extensao?.toLowerCase() != 'png' && extensao?.toLowerCase() != 'jpeg'){
        this.toast.error(`Extensão do arquivo não suportada - ${file.name}`);
      } else {
        const arquivoEnvio: Arquivo = {
          idArquivo: 0,
          idUsuario: 0,
          idAnuncio: 0,
          nomeArquivo: file.name
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.base64 = reader.result?.toString();
          console.log(this.base64);
          if (this.base64) {
            arquivoEnvio.arquivo = this.base64;
            this.listaDearquivos.push(arquivoEnvio);
            this.tabela?.atualizarTabela();
          } else {
            this.toast.error('Erro ao enviar arquivo. Tente novamente');
          }
        };
      }
    }
  }


/*enviarArquivo(){
  this.carregando=true
  let tamanho = this.listaDearquivos.length
  this.dialogRef.disableClose = true;
  this.total = 0
  let porcentagem = 100/this.listaDearquivos.length
  this.texto = `Enviando Arquivos, aguarde.${this.total}%`

  this.listaDearquivos.forEach(
    (dado) => {
      this.envioArquivo$ = this.sharedService.enviarArquivo(dado).subscribe({
        next: (dado) => {
          console.log(dado)
          tamanho--
          this.total = Math.round(this.total + porcentagem)
          this.texto = `Enviando Arquivos, aguarde.${this.total}%`
          if(tamanho==0){
            this.carregando = false
            this.dialogRef.close('fim')
          }
        },
        error: (dado) => {
          this.carregando = false
          this.dialogRef.close()
          this.toast.error('Erro ao enviar arquivo. Tente novamente')
        }
      })
    }
  )

}*/

enviarArquivo() {
  this.carregando = true;
  this.dialogRef.disableClose = true;
  this.total = 0;
  const tamanho = this.listaDearquivos.length;
  this.progresso = new Array(tamanho).fill(0);
  this.texto = `Enviando Arquivos, aguarde. ${this.total}%`;

  this.listaDearquivos.forEach((dado, index) => {
    /*this.envioArquivo$ = this.sharedService.enviarArquivo(dado).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const somatorio = Math.round((event.loaded / event.total!) * 100);
          this.progresso[index] = somatorio;
          this.total = Math.round((this.progresso.reduce((a, b) => a + b, 0) / tamanho));
          this.texto = `Enviando Arquivos, aguarde. ${this.total}%`;
        } else if (event.type === HttpEventType.Response) {
          if (this.progresso.every(p => p === 100)) {
            this.carregando = false;
            this.dialogRef.close('fim');
          }
        }
      },
      error: () => {
        this.carregando = false;
        this.dialogRef.close();
        this.toast.error('Erro ao enviar arquivo. Tente novamente');
      }
    });*/
  });
}


deletaItem(nome: string) {
  const index = this.listaDearquivos.findIndex(dado => dado.nomeArquivo === nome);
  if (index !== -1) {
    this.listaDearquivos.splice(index, 1);
    this.tabela?.atualizarTabela()
  }
}

retornaExtensao(nome:string){
  const ext = nome.split(/[.]/g)
  return ext[1]

}


}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Arquivo } from 'src/app/shared/model/arquivo';
import { DialogExcluirComponent } from '../../dialogExcluir/dialogExcluir.component';

@Component({
  selector: 'app-uploadArquivo-tabela',
  templateUrl: './uploadArquivo-tabela.component.html',
  styleUrls: ['./uploadArquivo-tabela.component.css']
})
export class UploadArquivoTabelaComponent implements OnInit {


  @Input()
  listaDearquivos!:Arquivo[]

  @Output()
  atualizarRegistro:EventEmitter<Arquivo> = new EventEmitter

  @Output()
  registroExcluido: EventEmitter<any> = new EventEmitter

  dados = new MatTableDataSource<any>([]);
  excluirRegistro$!:Subscription

  displayedColumns: string[] = ['nome','editar']

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
  }

  atualizarTabela(){
    this.dados.data = this.listaDearquivos
    this.dados.paginator = this.paginator
  }

  editar(dado:any){
    //console.log('clicou com >>>>', dado)
    this.atualizarRegistro.emit(dado)
  }

  retornaIcone(extensao:string){
    switch(extensao){
      case '.txt':
        return 'description'
      case '.pdf':
        return 'description'
      case '.doc':
        return 'description'
      case '.docx':
        return 'description'
      case '.jpg':
        return 'image'
      case '.png':
        return 'image'
      case '.jpeg':
        return 'image'
      case '.JPG':
        return 'image'
      case '.PNG':
        return 'image'
      case '.JPEG':
        return 'image'
      case '.xls':
        return 'table_view'
      case '.xlsx':
        return 'table_view'
      case '.xls':
        return 'data_table'
      case '.zip':
        return 'folder_zip'
      case '.rar':
        return 'folder_zip'
      default:
        return 'attachment'
    }
  }


  remover(nome:string){
    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(val=>{

      if(val){
        this.excluirRegistro(nome);
    }
  })
  }

  excluirRegistro(nome:string){
    this.toast.success('Item removido')
    this.registroExcluido.emit(nome)
  }

}

import { Anunciante } from './../../../myProfile/model/anunciante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedService } from '../../service/shared.service';
import { DialogExcluirComponent } from '../dialogExcluir/dialogExcluir.component';

@Component({
  selector: 'app-controleUsuario',
  templateUrl: './controleUsuario.component.html',
  styleUrls: ['./controleUsuario.component.css']
})
export class ControleUsuarioComponent implements OnInit {

  colunasTabela: string[] = ['descricao', 'alteracao']
  dados = new MatTableDataSource<Anunciante>()

  start: number = 0
  limit: number = 10
  end: number = this.limit + this.start
  selectedRowIndex!: number

  get$!: Subscription
  post$!: Subscription
  put$!: Subscription
  delete$!:Subscription

  categoria!:FormGroup

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private toast: ToastrService,
    private dialog: MatDialog,
    private shared: SharedService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.listarUsuarios()
  }

  tableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight
    const scrollLocation = e.target.scrollTop

    const buffer = 2000
    const limit = tableScrollHeight - tableViewHeight - buffer

    if ((scrollLocation > limit)) { //&& !this.pesquisa
      let data = this.getTableData(this.start, this.end)
      this.dados.data = this.dados.data.concat(data)
      this.updateIndex()
    }
  }

  getTableData(start: any, end: any) {
    return this.dados.data.filter((value, index) => index > start && index < end)
  }

  updateIndex() {
    this.start = this.end
    this.end = this.limit + this.start
  }

  listarUsuarios(){
    this.get$ = this.shared.listarAnunciantes().subscribe(
      (dado) => {
        this.dados.data = dado
      }
    )

  }

  remover(id: number) {
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirUser(id);
    }
  })
  }

  excluirUser(id: number) {
    this.delete$ = this.shared.excluirAnunciantes(id).subscribe({
      next: (dado) => {
        this.toast.success('Registro Excluído')
        this.listarUsuarios()
      }
    })
  }

  promoverADM(id:number){

      this.put$ = this.shared.promoverAdministrador(id).subscribe(
        (dado) => {
          this.toast.success("Categoria Atualizada")
          this.listarUsuarios()
        }
      )


  }

}

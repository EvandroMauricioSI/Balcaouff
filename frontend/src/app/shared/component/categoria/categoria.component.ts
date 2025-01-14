import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from './../../service/shared.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogExcluirComponent } from '../dialogExcluir/dialogExcluir.component';
import { Categoria } from '../../model/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  colunasTabela: string[] = ['descricao', 'alteracao']
  dados = new MatTableDataSource<Categoria>()

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
    this.categoria = this.form.group({
      id_categoria: [null],
      nome: [null, Validators.required]
    })
    this.listarCategorias()
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

  listarCategorias(){
    this.get$ = this.shared.listarCategoria().subscribe(
      (dado) => {
        this.dados.data = dado
      }
    )

  }

  remover(id: number) {
    const dialogRef = this.dialog.open(DialogExcluirComponent)

    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirForm(id);
    }
  })
  }

  excluirForm(id: number) {
    this.delete$ = this.shared.excluirCategoria(id).subscribe({
      next: (dado) => {
        this.toast.success('Registro Excluído')
        this.listarCategorias()
      }
    })
  }

  editar(dado: Categoria) {
    this.categoria.patchValue({
      id_categoria: dado.id_categoria,
      nome: dado.nome
    })
  }

  inserirCategoria(){
    const id = this.categoria.get("id_categoria")?.value

    const submit = {
      nome: this.categoria.get("nome")?.value
    }

    if(id){
      this.put$ = this.shared.atualizarCategoria(submit, id).subscribe(
        (dado) => {
          this.toast.success("Categoria Atualizada")
          this.listarCategorias()
        }
      )
    } else {
      this.post$ = this.shared.cadastrarCategoria(submit).subscribe(
        (dado) => {
          this.toast.success("Categoria Cadastrada")
          this.listarCategorias()
        }
      )
    }

  }

}



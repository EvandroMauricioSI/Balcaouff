import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from './../../service/shared.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogExcluirComponent } from '../dialogExcluir/dialogExcluir.component';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

  colunasTabela: string[] = ['bairro', 'cidade', 'estado', 'alteracao'];
  dados = new MatTableDataSource<any>(); // Altere para o modelo correto

  start: number = 0;
  limit: number = 10;
  end: number = this.limit + this.start;
  selectedRowIndex!: number;

  get$!: Subscription;
  post$!: Subscription;
  put$!: Subscription;
  delete$!: Subscription;

  localizacao!: FormGroup;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private toast: ToastrService,
    private dialog: MatDialog,
    private shared: SharedService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.localizacao = this.form.group({
      id_localizacao: [null],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
    this.listarLocalizacoes();
  }

  tableScroll(e: any) {
    const tableViewHeight = e.target.offsetHeight;
    const tableScrollHeight = e.target.scrollHeight;
    const scrollLocation = e.target.scrollTop;

    const buffer = 2000;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if ((scrollLocation > limit)) { //&& !this.pesquisa
      let data = this.getTableData(this.start, this.end);
      this.dados.data = this.dados.data.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start: any, end: any) {
    return this.dados.data.filter((value, index) => index > start && index < end);
  }

  updateIndex() {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  listarLocalizacoes(){
    this.get$ = this.shared.listarLocalizacao().subscribe(
      (dado) => {
        this.dados.data = dado;
      }
    );
  }

  remover(id: number) {
    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.excluirForm(id);
      }
    });
  }

  excluirForm(id: number) {
    this.delete$ = this.shared.excluirLocalizacao(id).subscribe({
      next: (dado) => {
        this.toast.success('Registro Excluído');
        this.listarLocalizacoes();
      }
    });
  }

  editar(dado: any) {
    this.localizacao.patchValue({
      id_localizacao: dado.id_localizacao,
      bairro: dado.bairro,
      cidade: dado.cidade,
      estado: dado.estado
    });
  }

  inserirLocalizacao() {
    const id = this.localizacao.get('id_localizacao')?.value;

    const submit = {
      bairro: this.localizacao.get('bairro')?.value,
      cidade: this.localizacao.get('cidade')?.value,
      estado: this.localizacao.get('estado')?.value
    };

    if (id) {
      this.put$ = this.shared.atualizarLocalizacao(submit, id).subscribe(
        (dado) => {
          this.toast.success('Localização Atualizada');
          this.listarLocalizacoes();
        }
      );
    } else {
      this.post$ = this.shared.cadastrarLocalizacao(submit).subscribe(
        (dado) => {
          this.toast.success('Localização Cadastrada');
          this.listarLocalizacoes();
        }
      );
    }
  }

}

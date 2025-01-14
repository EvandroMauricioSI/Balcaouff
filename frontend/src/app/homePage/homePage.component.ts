import { ToastrService } from 'ngx-toastr';
import { Categoria } from './../shared/model/categoria';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Anunciante } from './../myProfile/model/anunciante';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/shared.service';
import { AnuncioDetalhadoComponent } from './anuncioDetalhado/anuncioDetalhado.component';
import { MyProfileComponent } from '../myProfile/myProfile.component';
import { UploadArquivoComponent } from '../shared/component/uploadArquivo/uploadArquivo.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MyAddsService } from '../myAdds/service/myAdds.service';
import { ListarAnuncio } from '../myAdds/model/anuncio';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Localizacao } from '../shared/model/localizacao';
import { MandarEmailComponent } from './mandarEmail/mandarEmail.component';
import { DialogGenericoComponent } from '../shared/dialogGenerico/dialogGenerico.component';


@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  //usuario:string = this.sharedService.obterUsuario()

  anuncios:ListarAnuncio[] = []
  anunciosFiltered:ListarAnuncio[] = []
  pesquisa!:FormGroup
  coluna!:number
  categoria$!:Observable<Categoria[]>
  localizacao$!:Observable<Localizacao[]>
  status:string[] = ["Troca","Venda","Doação"]
  imagem = 'assets/placeholderAnuncio.jpg'
  imagemAnunciante = 'assets/placeholderUser.jpg'
  precoRange: number[] = [0, 0];
  comprar$!:Observable<any>
  avaliar$!:Observable<any>

  constructor(
    private sharedService: SharedService,
    private adds: MyAddsService,
    private responsive: BreakpointObserver,
    private form: FormBuilder,
    private dialog: MatDialog,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.responsive.observe([
      "(max-width: 1366px)"
    ]).subscribe(
      (result: BreakpointState) => {
        console.log(result)
        if (result.matches) {
          this.coluna = 4
          console.log(this.coluna)
      } else {
          this.coluna = 3
          console.log(this.coluna)
      }
      }
    )

    this.categoria$ = this.sharedService.listarCategoria()
    this.localizacao$ = this.sharedService.listarLocalizacao()

    this.pesquisa = this.form.group({
      status: [null],
      categoria: [null],
      localizacao: [null],
      precoMin: [null],
      precoMax: [null]
    })

    this.listarAnuncios()
  }

  listarAnuncios(){
    this.adds.listarTodosAnuncios(this.sharedService.getIDusuario()).subscribe(
      (dado) => {
        this.anuncios = dado
        this.anunciosFiltered = dado
      }
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  transacoes(){
    this.router.navigate(['/transacao'])
  }

  categorias(){
    this.router.navigate(['/categoria'])
  }

  relatorio(){
    this.router.navigate(['/relatorio'])
  }

  abreAnuncio(item:ListarAnuncio){

    const dialogRef = this.dialog.open(AnuncioDetalhadoComponent, {
      width: '1000px',
      height: '750px',
      data: {
        dado: item
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){

      }
    })
  }

  adicionaImagem(){
    const dialogRef = this.dialog.open(UploadArquivoComponent, {
      width: '1000px',
      height: '700px',
      data: {
      }
    });
  }

  abrePerfil(dado:Anunciante) {
    const dialogRef = this.dialog.open(MyProfileComponent, {
      width: '1000px',
      height: '600px',
      data: {
        dado: dado,
        carregando: "display:none",
        visit: true
      }
    });

    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {

        const dialogContainer = document.querySelector('.card-container');
        if (dialogContainer) {
          dialogContainer.scrollIntoView()
        }
        dialogRef.componentInstance.carregando = ""
      }, 0);
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val) {

      }
    });
  }

  comprarItem(item:number){
    const dialogRef = this.dialog.open(DialogGenericoComponent, {
      width: '401px',
      height: '130px',
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){
        console.log(val)
        const aval = val
        this.comprar$ = this.adds.comprarAnuncio(item)
        this.avaliar$ = this.adds.avaliarAnuncio(item,aval)

        forkJoin([this.comprar$, this.avaliar$]).subscribe({
          next: ([dado1, dado2]) => {
            this.toast.success("Parabéns! Você acaba de adquirir um novo item")
            this.listarAnuncios()
          }
        })
      }
    })
  }

  enviarMensagem(email:string){
    const dialogRef = this.dialog.open(MandarEmailComponent, {
      width: '500px',
      height: '650px',
      data: {
        dado: email
      }
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){

      }
    })

  }

  pesquisar(){
    const status = this.pesquisa.get('status')?.value
    const categoria = this.pesquisa.get('categoria')?.value
    const precoMin = this.pesquisa.get('precoMin')?.value
    const precoMax = this.pesquisa.get('precoMax')?.value

    if (precoMin || precoMax) {
      this.listarPreco(this.pesquisa.value)
    } else if (status) {
      this.listarStatus(this.pesquisa.value)
    } else if (categoria) {
      this.listarCategoria(this.pesquisa.value)
    } else {
      this.listarLocalizacao(this.pesquisa.value)
      console.log('filtro', this.anunciosFiltered)
    }
  }

  resetar(){
    this.anunciosFiltered = this.anuncios
    this.pesquisa.reset()
  }

  listarPreco(form: any) {

    const precoMin = form.precoMin
    const precoMax = form.precoMax

    if (precoMin && precoMax) {
      this.listarStatus(
        form,
        this.anunciosFiltered.filter(
          (dado) => {
            return dado.preco >= precoMin && dado.preco <= precoMax
          }
        )
      )
    } else if (precoMin) {
      this.listarStatus(
        form,
        this.anunciosFiltered.filter(
          (dado) => {
            return dado.preco >= precoMin
          }
        )
      )
    } else {
      this.listarStatus(
        form,
        this.anunciosFiltered.filter(
          (dado) => {
            return dado.preco <= precoMax
          }
        )
      )
    }
  }

  listarStatus(form: any, dadoFiltrado?: any[]) {

    const status = form.status

    if (status && dadoFiltrado) {
      this.listarCategoria(
        form,
        dadoFiltrado.filter(
          (dado) => {
            return dado.tipo.toUpperCase() == status.toUpperCase()
          }
        )
      )
    } else if (status) {
      console.log('transacao')
      this.listarCategoria(
        form,
        this.anunciosFiltered.filter(
          (dado) => {
            return dado.tipo.toUpperCase() == status.toUpperCase()
          }
        )
      )
    } else if (dadoFiltrado) {
      console.log('sem transacao')
      this.listarCategoria(
        form,
        dadoFiltrado
      )
    } else {
      this.listarCategoria(form)
    }
  }

  listarCategoria(form: any, dadoFiltrado?: any[]){
    console.log(form)
    const categoria = form.categoria

    if (categoria && dadoFiltrado) {
      this.listarLocalizacao(
        form,
        dadoFiltrado.filter(
          (dado) => {
            return +dado.categoria.id_categoria == +categoria
          }
        )
      )
    } else if (categoria) {
      console.log('transacao')
      this.listarLocalizacao(
        form,
        this.anunciosFiltered.filter(
          (dado) => {
            return +dado.categoria.id_categoria == +categoria
          }
        )
      )
    } else if (dadoFiltrado) {
      console.log('sem transacao')
      this.listarLocalizacao(
        form,
        dadoFiltrado
      )
    } else {
      this.listarLocalizacao(form)
    }

  }

  listarLocalizacao(form: any, dadoFiltrado?: any[]){
    const localizacao = form.localizacao

    if (localizacao && dadoFiltrado) {
      console.log('filtro e categoria')
      this.anunciosFiltered = dadoFiltrado.filter(
        (dado) => {
          return +dado.local.id_localizacao == +localizacao
        }
      )
    } else if (localizacao) {
      console.log('so categoria')
      this.anunciosFiltered = this.anunciosFiltered.filter(
        (dado) => {
          return +dado.local.id_localizacao == +localizacao
        }
      )
    } else if (dadoFiltrado) {
      console.log('o que sobro')
      this.anunciosFiltered = dadoFiltrado
    }
  }

  imagemExibida(imagem:string){
    return imagem ?? this.imagem
  }

  retornaFotoAnunciante(imagem:string){
    return imagem ?? this.imagemAnunciante

  }





}

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/shared.service';
import { AnuncioDetalhadoComponent } from './anuncioDetalhado/anuncioDetalhado.component';
import { MyProfileComponent } from '../myProfile/myProfile.component';
import { UploadArquivoComponent } from '../shared/component/uploadArquivo/uploadArquivo.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  //usuario:string = this.sharedService.obterUsuario()

  anuncios:number[] = [0,1,2,3]

  coluna!:number

  constructor(
    private sharedService: SharedService,
    private responsive: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(window.innerWidth)
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

  abreAnuncio(){

    const dialogRef = this.dialog.open(AnuncioDetalhadoComponent, {
      width: '500px',
      height: '246px',
      data: {
        dado: null
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

  abrePerfil() {
    const dialogRef = this.dialog.open(MyProfileComponent, {
      width: '1000px',
      height: '600px',
      data: {
        dado: null,
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


}

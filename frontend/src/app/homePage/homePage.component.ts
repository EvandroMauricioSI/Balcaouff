import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/service/shared.service';
import { AnuncioDetalhadoComponent } from './anuncioDetalhado/anuncioDetalhado.component';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  //usuario:string = this.sharedService.obterUsuario()

  anuncios:number[] = [0,1,2,3]

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
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

}

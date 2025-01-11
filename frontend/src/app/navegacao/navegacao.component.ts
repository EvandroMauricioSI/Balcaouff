import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent implements OnInit {

  opened!: boolean;
  panelOpenState = false;
  loading = true
  showSidenav: boolean = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  nomeUsuario = "Clairo Cottrill"

  rating: number = this.calculoRating();

  // Criando um array de 5 estrelas
  stars: number[] = this.criaVetor(this.calculoRating())

  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      console.log(this.router.url)
      if (this.router.url === '/login') {
        this.showSidenav = false
      } else {
        this.showSidenav = true
      }
    });

  }


  paginaInicial(){
    this.router.navigate(['/']);
  }


  logout(){
    this.router.navigate(["/login"])
  }

  login(){
    const login = localStorage.getItem('usuario')
    return login
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  calculoRating(){
    const numero = 2.4527468456965 //nota baixa pq ela nao vem pro Brasil
    return parseFloat(numero.toFixed(1));
  }

  criaVetor(tamanho:number){
    tamanho = Math.floor(tamanho)
    const vetor = []
    for(let i=0;i<tamanho;i++){
      vetor.push(i)
    }
    return vetor

  }

  logoff(){
    localStorage.removeItem('usuario')
    this.router.navigate(['/login'])
  }


  ngOnDestroy(): void {
  }
}

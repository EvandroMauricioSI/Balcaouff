import { MyAddsService } from './../myAdds/service/myAdds.service';
import { Anunciante } from './../myProfile/model/anunciante';
import { Subscription, take } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UsuarioService } from '../myProfile/service/usuario.service';


@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent implements OnInit, OnDestroy {

  opened!: boolean;
  panelOpenState = false;
  loading = true
  showSidenav: boolean = true;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  admin!:boolean
  rating!: number

  // Criando um array de 5 estrelas
  stars!: number[]
  user$!:Subscription
  user!:Anunciante

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private cdr: ChangeDetectorRef,
    private usuario: UsuarioService,
    private add: MyAddsService

  ) { }


  ngOnInit(): void {
    this.router.events.subscribe(() => {
      console.log(this.router.url)
      if (this.router.url === '/login' || this.router.url === '/') {
        this.showSidenav = false
      } else {
        this.obtemDados()
        this.showSidenav = true
      }
    });
  }

  obtemDados(){
    this.admin = this.shared.getAdmin()
    setTimeout(()=>{
      this.user$ = this.usuario.listarUsuario(this.shared.getIDusuario()).subscribe(
        (dado) => {
          this.user	= dado
          this.calculoRating()
        }
      )
    },500)
  }


  paginaInicial(){
    this.router.navigate(['/home']);
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
    this.user$ = this.add.calculoRating(this.shared.getIDusuario()).subscribe(
      (dado) => {
        this.rating = dado
        this.stars = this.criaVetor(dado)
      }
    )
  }

  /*calculoRating(){
    const numero = 2.4527468456965 //nota baixa pq ela nao vem pro Brasil
    return parseFloat(numero.toFixed(1));
  }*/

  criaVetor(tamanho:number){
    tamanho = Math.floor(tamanho)
    const vetor = []
    for(let i=0;i<tamanho;i++){
      vetor.push(i)
    }
    return vetor

  }

  logoff(){
    localStorage.removeItem('usuario');
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  retornaFoto(foto:string){
    return foto ?? 'assets/placeholderUser.jpg'
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe()
  }

}

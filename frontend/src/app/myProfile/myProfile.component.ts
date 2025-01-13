import { SharedService } from './../shared/service/shared.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { Anunciante } from './model/anunciante';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, INJECTOR, OnInit, Optional } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Anuncio, ListarAnuncio } from '../myAdds/model/anuncio';
import { UsuarioService } from './service/usuario.service';
import { MyAddsService } from '../myAdds/service/myAdds.service';

@Component({
  selector: 'app-myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.css']
})
export class MyProfileComponent implements OnInit {

  nomeUsuario!:string
  stars: number[] = this.criaVetor(this.calculoRating())
  rating: number = this.calculoRating();
  carregando = this.data?.carregando ?? ''
  visit = this.data?.visit ?? false
  anunciante:Anunciante = this.data?.dado ?? false

  anuncios:ListarAnuncio[] = [];
  anunciosComprados:ListarAnuncio[] = [];
  anuncios$!:Subscription
  anunciosComprados$!:Subscription

  currentIndex: number = 0;
  currentIndex2: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any = '',
    private route: ActivatedRoute,
    private user: UsuarioService,
    private shared: SharedService,
    private add: MyAddsService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.anunciante){ //so pra ver o perfil
      const id = +this.anunciante.id

      this.anuncios$ = this.add.listarAnuncioUsuario(id).subscribe(
          (dado) => {
            this.anuncios = dado
          }
        )
    } else { //perfil editavel
      const anunciante:Observable<Anunciante> = this.user.listarUsuario(this.shared.getIDusuario())
      const anuncios:Observable<ListarAnuncio[]> = this.add.listarAnuncioUsuario(this.shared.getIDusuario())
      const anunciosC:Observable<ListarAnuncio[]> = this.add.listarAnuncioComprado(this.shared.getIDusuario())

      forkJoin([anunciante, anuncios, anunciosC]).subscribe({
        next: ([dado1, dado2, dado3]) => {
          this.anunciante = dado1
          this.anuncios = dado2
          this.anunciosComprados = dado3
        }
      })
    }
  }

  editarPerfil(id:number) {
    if(id == this.shared.getIDusuario()){
      this.router.navigate([`${id}`], { relativeTo: this.route });
    }
  }

  calculoRating(){
    const numero = 4.4527468456965 //nota baixa pq ela nao vem pro Brasil
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

  retornaOffset(){
    return this.visit ?  2 : 3
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = Math.ceil(this.anuncios.length/this.retornaOffset());  // Vai para o último conjunto
    }
    this.updateCarouselPosition();
  }

  moveRight() {
    if (this.currentIndex < Math.ceil(this.anuncios.length/this.retornaOffset())) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;  // Vai para o primeiro conjunto
    }
    this.updateCarouselPosition();
  }

  moveLeft2() {
    if (this.currentIndex2 > 0) {
      this.currentIndex2 -= 1;
    } else {
      this.currentIndex2 = Math.ceil(this.anunciosComprados.length/this.retornaOffset());  // Vai para o último conjunto
    }
    this.updateCarouselPosition2();
  }

  moveRight2() {
    if (this.currentIndex2 < Math.ceil(this.anunciosComprados.length/this.retornaOffset())) {
      this.currentIndex2 += 1;
    } else {
      this.currentIndex2 = 0;  // Vai para o primeiro conjunto
    }
    this.updateCarouselPosition2();
  }

  updateCarouselPosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const offset = -(this.currentIndex * 33);  // Desloca os itens para a esquerda em 100% por vez -> 23 e a porcentagem
    carousel.style.transform = `translateX(${offset}%)`;  // Aplica o deslocamento em % para cada conjunto
  }

  updateCarouselPosition2() {
    const carousel = document.querySelector('.carousel2') as HTMLElement;
    const offset = -(this.currentIndex2 * 33);  // Desloca os itens para a esquerda em 100% por vez -> 23 e a porcentagem
    carousel.style.transform = `translateX(${offset}%)`;  // Aplica o deslocamento em % para cada conjunto
  }

  abreAnuncio() {
    console.log('Abrir anúncio');
  }

  retornaFoto(foto:string){
    console.log(foto)
    return foto ?? "assets/placeholderUser.jpg"
  }

  imagemAnuncio(imagem:string){
    return imagem ?? "assets/placeholderAnuncio.jpg"
  }

}




import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, INJECTOR, OnInit, Optional } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myProfile',
  templateUrl: './myProfile.component.html',
  styleUrls: ['./myProfile.component.css']
})
export class MyProfileComponent implements OnInit {

  nomeUsuario = "Clairo Cottrill"
  stars: number[] = this.criaVetor(this.calculoRating())
  rating: number = this.calculoRating();
  carregando = this.data?.carregando ?? ''
  visit = this.data?.visit ?? false

  anuncios = [
    {
      title: 'Bulldog',
      subtitle: 'Raça de Cachorro',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'O Bulldog Francês é uma raça de cachorro popular conhecida por sua personalidade amigável kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkk...'
    },
    {
      title: 'Bulldog',
      subtitle: 'Raça de Cachorro',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'O Bulldog Francês é uma raça de cachorro popular conhecida por sua personalidade amigável...'
    },
    {
      title: 'Bulldog',
      subtitle: 'Raça de Cachorro',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'O Bulldog Francês é uma raça de cachorro popular conhecida por sua personalidade amigável...'
    },
    {
      title: 'Bulldog',
      subtitle: 'Raça de Cachorro',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      description: 'O Bulldog Francês é uma raça de cachorro popular conhecida por sua personalidade amigável...'
    },
    // mais anúncios...
  ];

  currentIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any = '',
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  editarPerfil() {
    this.router.navigate(['12'], { relativeTo: this.route });
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

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = Math.ceil(this.anuncios.length/3) - 1;  // Vai para o último conjunto
    }
    this.updateCarouselPosition();
  }

  moveRight() {
    if (this.currentIndex < Math.ceil(this.anuncios.length/3) - 1) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;  // Vai para o primeiro conjunto
    }
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const offset = -(this.currentIndex * 33);  // Desloca os itens para a esquerda em 100% por vez -> 23 e a porcentagem
    carousel.style.transform = `translateX(${offset}%)`;  // Aplica o deslocamento em % para cada conjunto
  }

  abreAnuncio() {
    console.log('Abrir anúncio');
  }

}




import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Anuncio } from './model/anuncio';
import { Component, OnInit } from '@angular/core';
import { MyAddsService } from './service/myAdds.service';
import { MatDialog } from '@angular/material/dialog';
import { MyAddsEditComponent } from './myAddsEdit/myAddsEdit.component';
import { DialogExcluirComponent } from '../shared/component/dialogExcluir/dialogExcluir.component';

@Component({
  selector: 'app-myAdds',
  templateUrl: './myAdds.component.html',
  styleUrls: ['./myAdds.component.css']
})
export class MyAddsComponent implements OnInit {

  nomeUsuario = "Clairo Cottrill"
  currentIndex: number = 0;
  anuncios: Anuncio[] = []
  anuncios$!:Subscription
  excluir$!:Subscription

  constructor(
    private service: MyAddsService,
    private dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.listarAnuncios()
  }

  listarAnuncios(){
    this.anuncios$ = this.service.listarAnuncioUsuario(1).subscribe(
      (dado) => {
        console.log(dado)
        this.anuncios = dado
      }
    )
  }

  offset(){
    return this.anuncios.length <= 3 ? 1 : 0
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = Math.ceil(this.anuncios.length/3) - this.offset();  // Vai para o último conjunto
    }
    this.updateCarouselPosition();
  }

  moveRight() {
    if (this.currentIndex < Math.ceil(this.anuncios.length/3) - this.offset()) {
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

  criarAnuncio(){

    const dialogRef = this.dialog.open(MyAddsEditComponent, {
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
        this.listarAnuncios()
      }
    });

  }

  editarAnuncio(anuncio:Anuncio){

    const dialogRef = this.dialog.open(MyAddsEditComponent, {
      width: '1000px',
      height: '600px',
      data: {
        dado: anuncio,
        carregando: "display:none",
        editar: true
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
        this.listarAnuncios()
      }
    });

  }

  excluirAnuncio(anuncio:Anuncio){

    const id = anuncio.id_anuncio
    const vendido = anuncio.comprador ? true : false

    const dialogRef = this.dialog.open(DialogExcluirComponent);

    dialogRef.afterClosed().subscribe(val => {
      if (val && id && !vendido) {
        this.service.excluirAnuncio(id).subscribe(
          (dado) => {
            this.toast.success('Registro Excluido com sucesso')
            this.listarAnuncios()
          }
        )
      } else {
        this.toast.error('Nao e possivel excluir um item ja vendido')
      }
    })

  }


}

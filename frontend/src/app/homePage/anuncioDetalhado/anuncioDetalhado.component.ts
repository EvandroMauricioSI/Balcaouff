import { ListarAnuncio } from './../../myAdds/model/anuncio';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-anuncioDetalhado',
  templateUrl: './anuncioDetalhado.component.html',
  styleUrls: ['./anuncioDetalhado.component.css']
})
export class AnuncioDetalhadoComponent implements OnInit {

  imagem = '/src/assets/placeholder.png'
  anuncio:ListarAnuncio = this.data.dado

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any = '',
  ) { }

  ngOnInit() {
    console.log(this.anuncio.foto)
    this.imagem = this.anuncio.foto
  }

  retornaImagem(imagem:string){
    return imagem ?? 'assets/placeholderAnuncio.jpg'
  }

  retornaAnunciante(imagem:string){
    return imagem ?? 'assets/placeholderUser.jpg'
  }

}

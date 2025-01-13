import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dialogGenerico',
  templateUrl: './dialogGenerico.component.html',
  styleUrls: ['./dialogGenerico.component.css']
})
export class DialogGenericoComponent implements OnInit {
  selectedRating: number = 1;

  // Array para gerar 5 estrelas
  stars: number[] = [1, 2, 3, 4, 5];



  resposta!:boolean

  constructor(
    private sharedService: SharedService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  verifica(resposta:boolean){
    this.resposta = resposta
  }

    // Função para setar a avaliação
    setRating(rating: number): void {
      this.selectedRating = rating;
    }

    // Função para resetar as estrelas ao sair com o mouse
    resetStars(): void {
      // Se você quiser que a cor das estrelas só mude no clique, mantenha a lógica acima
    }

}

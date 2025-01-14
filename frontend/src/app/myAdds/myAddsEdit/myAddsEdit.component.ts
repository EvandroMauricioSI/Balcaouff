import { MyAddsService } from './../service/myAdds.service';
import { Anuncio } from './../model/anuncio';
import { SharedService } from './../../shared/service/shared.service';
import { Localizacao } from './../../shared/model/localizacao';
import { Categoria } from './../../shared/model/categoria';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { tipo } from 'src/app/shared/model/tipo';

@Component({
  selector: 'app-myAddsEdit',
  templateUrl: './myAddsEdit.component.html',
  styleUrls: ['./myAddsEdit.component.css']
})
export class MyAddsEditComponent implements OnInit {

  carregando = this.data?.carregando ?? ''
  anuncio =  this.data?.dado ?? []
  editar = this.data?.editar ?? false
  imagem: null | string = null
  cadastro!:FormGroup
  fileName = '';
  listaDearquivos:any[] = []
  base64!:string | undefined
  envioArquivo$!: Subscription
  $categoria!: Observable<Categoria[]>
  $localizacao!: Observable<Localizacao[]>
  $salvarAnuncio!:Subscription



  anuncioTipo:tipo[] = [
    {id: 1, nome:'Venda'},
    {id: 2, nome:'Doação'}
  ]

  condicao:string[] = [
    'Novo',
    'Usado',
    "Semi-novo",
    "Descarte"
  ]

  @Input()
  requiredFileType!:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any = '',
    private dialog: MatDialog,
    private form: FormBuilder,
    private toast: ToastrService,
    private sharedService: SharedService,
    private service: MyAddsService
  ) { }

  ngOnInit() {
    this.carregando = 'display:none'
    this.cadastro = this.form.group({
      id_anuncio: [null],
      tipo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      preco: [null, [Validators.required]],
      foto: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      condicao_produto: [null, [Validators.required]],
      anunciante: [null],
      local: [null, [Validators.required]],
    })

    this.$categoria = this.sharedService.listarCategoria()
    this.$localizacao = this.sharedService.listarLocalizacao()

    this.populaForm()
  }

  populaForm(){
    if(this.anuncio){

      this.imagem = this.anuncio.foto

      this.cadastro.patchValue({
        id_anuncio: this.anuncio.id_anuncio,
        tipo: this.anuncio.tipo,
        descricao: this.anuncio.descricao,
        preco: this.anuncio.preco,
        foto: this.anuncio.foto,
        categoria: this.anuncio.categoria.id_categoria,
        condicao_produto: this.anuncio.condicao_produto,
        anunciante: this.anuncio.anunciante,
        local: this.anuncio.local.id_localizacao,
      })

      this.carregando = ''
    } else {
      this.carregando = ''
    }
  }

  onFileSelected(event: any) {
    console.log('abri file selected')

    const files: FileList = event.target.files;

    console.log('debug file', files)

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      console.log(file);
      const tipo = file.type;
      console.log(tipo);
      this.fileName = file.name;
      const extensao = this.retornaExtensao(file.name)
      console.log(extensao?.toLowerCase())

      if (file.size > 1000000) {
        this.toast.error(`Arquivo deve ser menor do que 5MB - ${file.name}`);
      }
      else if(extensao?.toLowerCase() != 'jpg' && extensao?.toLowerCase() != 'png' && extensao?.toLowerCase() != 'jpeg'){
        this.toast.error(`Extensão do arquivo não suportada - ${file.name}`);
      } else {

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.base64 = reader.result?.toString();
          console.log(this.base64);
          if (this.base64) {
            this.imagem = this.base64
            this.cadastro.patchValue({
              foto: this.base64
            })
          } else {
            this.toast.error('Erro ao enviar arquivo. Tente novamente');
          }
        };
      }
    }
  }

  enviarDados(){
    const id = this.cadastro.get('id_anuncio')?.value

    const formulario: Anuncio = {
      tipo: this.cadastro.get('tipo')?.value,
      descricao: this.cadastro.get('descricao')?.value,
      preco: this.cadastro.get('preco')?.value,
      foto: this.cadastro.get('foto')?.value,
      categoria: this.cadastro.get('categoria')?.value,
      condicao_produto: this.cadastro.get('condicao_produto')?.value,
      anunciante: this.sharedService.getIDusuario(),
      local: this.cadastro.get('local')?.value,
    }

    if(id){
      console.log('tenho anuncio')
      formulario.id_anuncio = id
      this.$salvarAnuncio = this.service.atualizarCadastroAnuncio(formulario, id).subscribe(
        (dado) => {
          console.log(dado)
          this.toast.success(dado)
        }
      )
    } else {
      this.$salvarAnuncio = this.service.cadastrarAnuncio(formulario).subscribe(
        (dado) => {
          this.toast.success("Anuncio Adicionado")
        }
      )
    }
  }

  retornaExtensao(nome:string){
    const ext = nome.split(/[.]/g)
    return ext[1]

  }

  retornaImagem(){
    return this.imagem ?? 'assets/placeholderAnuncio.jpg'
  }

}

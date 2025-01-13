import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';
import { Anunciante } from '../model/anunciante';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-myProfile-edit',
  templateUrl: './myProfile-edit.component.html',
  styleUrls: ['./myProfile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit {

  carregando!:''
  img = "assets/placeholderUser.jpg"
  fileName = '';
  uploadProgress!:number;
  uploadSub!: Subscription;
  listaDearquivos:any[] = []
  base64!:string | undefined
  envioArquivo$!: Subscription
  progresso!: any[];
  dadosCadastrais!: FormGroup

  @Input()
  requiredFileType!:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private user: UsuarioService,
    private shared: SharedService,
    private toast: ToastrService,
    private form: FormBuilder
  ) { }

  ngOnInit() {

    this.dadosCadastrais = this.form.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      ocupacao: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      foto_de_perfil: [null]
    })

    const anunciante:Observable<Anunciante> = this.user.listarUsuario(this.shared.getIDusuario())

    forkJoin([anunciante]).subscribe({
      next: ([dado1]) => {
        this.atualizarDados(dado1)

      }
    })
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
        const arquivoEnvio: any = {
          idArquivo: 0,
          idUsuario: 0,
          idAnuncio: 0,
          nomeArquivo: file.name
        };

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          this.base64 = reader.result?.toString();
          console.log(this.base64);
          if (this.base64) {
            arquivoEnvio.arquivo = this.base64;
            this.img = this.base64
          } else {
            this.toast.error('Erro ao enviar arquivo. Tente novamente');
          }
        };
      }
    }
  }

  atualizarDados(dado:Anunciante){
    this.dadosCadastrais.patchValue({
      idUsuario: dado.id,
      nome: dado.nome,
      email: dado.email,
      ocupacao: dado.ocupacao,
      telefone: dado.telefone,
    })
    if(dado.foto_de_perfil){
      this.dadosCadastrais.patchValue({
        foto_de_perfil: dado.foto_de_perfil
      })
      this.img = dado.foto_de_perfil
    }
  }

  enviarDados(){
    this.dadosCadastrais.patchValue({
      foto_de_perfil: this.img
    })

    const form = this.user.atualizarUsuario(this.dadosCadastrais.value).subscribe(
      (dado) => {
        this.toast.success('Dados atualizados com sucesso')
      }
    )
  }

  retornar(){
    this.router.navigate(['/perfil'])
  }

  retornaExtensao(nome:string){
    const ext = nome.split(/[.]/g)
    return ext[1]

  }

  phoneNumber: string = '';

  formatPhoneNumber() {
    this.phoneNumber = this.phoneNumber.replace(/\D/g, '');

    if (this.phoneNumber.length <= 10) {
      this.phoneNumber = this.phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else {
      this.phoneNumber = this.phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  }

}

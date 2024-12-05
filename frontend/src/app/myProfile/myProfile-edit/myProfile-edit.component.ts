import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-myProfile-edit',
  templateUrl: './myProfile-edit.component.html',
  styleUrls: ['./myProfile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit {

  carregando!:''
  img = "https://tecoapple.com/wp-content/uploads/2019/05/clairobagsa019.jpg"
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
    private toast: ToastrService,
    private form: FormBuilder
  ) { }

  ngOnInit() {

    this.dadosCadastrais = this.form.group({
      idUsuario: [null],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      isAdmin: [null],
      ocupacao: [null, [Validators.required]],
      reputacao: [null],
      contato: [null, [Validators.required]],
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

      if (file.size > 5000000) {
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

  enviarDados(){
    alert('foi')
  }

  retornar(){
    this.router.navigate(['/perfil'])
  }

  retornaExtensao(nome:string){
    const ext = nome.split(/[.]/g)
    return ext[1]

  }

}

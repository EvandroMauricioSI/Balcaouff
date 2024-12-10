import { Usuario } from './../shared/model/usuario';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SharedService } from '../shared/service/shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { comparaSenhas } from './validator/login';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  formLogin!:FormGroup
  cadastro!:boolean
  acao:string = "Login"
  conexaoAPI$!:Subscription
  toggle:boolean = false
  exibeSenha:string = 'password'
  exibeIcone:string = 'visibility'

  constructor(
    private toast: ToastrService,
    private form: FormBuilder,
    private service: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = this.form.group({
      login: [null, [Validators.required, this.emailValidator()]],
      senha: [null, [Validators.required]],
      senha2: [null],
      //usuario: [null]
    }, {
      validators: [comparaSenhas()]
    });

  }

  mudaExibicao(){
    if(!this.toggle){
      this.exibeSenha = 'text'
      this.exibeIcone = 'visibility_off'
      this.toggle = true

    }else{
      this.exibeSenha = 'password'
      this.exibeIcone = 'visibility'
      this.toggle = false
    }

  }

  ativarCadastro(){
    this.cadastro = true
    this.acao = "Registro"

    const validaSenha = this.formLogin.get('senha2');
    //const usuario = this.formLogin.get('usuario');

    validaSenha?.setValidators([Validators.required]);
    validaSenha?.updateValueAndValidity();
    //usuario?.setValidators([Validators.required]);
    //usuario?.updateValueAndValidity();

  }

  ativarLogin(){
    const validaSenha = this.formLogin.get('senha2')
    const usuario = this.formLogin.get('usuario')

    this.formLogin.reset()
    this.formLogin.markAsPristine()
    this.cadastro = false
    this.acao = "Login"
    validaSenha?.clearValidators()
    validaSenha?.updateValueAndValidity()
    //usuario?.clearValidators()
    //usuario?.updateValueAndValidity()
  }

  checaForm(){
    if(this.formLogin.errors && this.formLogin.errors?.['senhasDiferentes']){
      if(this.toast.currentlyActive){
        this.toast.clear()
        this.toast.error('As senhas devem ser iguais')
      }else{
        this.toast.error('As senhas devem ser iguais')
      }
    }
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const email = control.value.trim();
        const emailPattern = /@id\.uff\.br$/;
        if (!emailPattern.test(email)) {
          return { invalidEmailDomain: true };
        }
      }
      return null;
    };
  }

  validaObrigatorio(){
    return this.formLogin.get('login')?.hasError('required')
  }

  validaDominio(){
    return this.formLogin.get('login')?.hasError('invalidEmailDomain')
  }

  retornaClasseTitulo(){
    return this.acao == "Login" ? "tituloLogin" : "tituloCadastro"
  }

  enviarDados() {
    const formulario: Usuario = {
      email: this.formLogin.get('login')?.value,
      senha: this.formLogin.get('senha')?.value
    }

    if(this.cadastro){

      const validaSenha = this.formLogin.get('senha2')

      this.conexaoAPI$ = this.service.cadastrarUsuario(formulario).subscribe(
        (dado) => {
          console.log('Resposta: ', dado)
          this.toast.success('Usuário Cadastrado com sucesso!')
          this.formLogin.reset()
          this.formLogin.markAsPristine()
          this.cadastro = false
          this.acao = "Login"
          validaSenha?.clearValidators()
          validaSenha?.updateValueAndValidity()
        }
      )

    }else{
      console.log('f', formulario)

      this.conexaoAPI$ = this.service.loginUsuario(formulario).subscribe({
        next: (dado) => {
          console.log('Resposta: ', dado)
          localStorage.setItem('usuario', JSON.stringify(dado))
          this.router.navigate(['/'])
        }
      })
    }
  }



}

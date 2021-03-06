import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Usuario } from '../acesso/usuario.model';
import { Auths } from '../auths.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],

})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    'nome_completo': new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
    'nome_usuario': new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
    'senha': new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(30)]),
  })


  @Input()
  public cadastroErro:boolean = false;

  constructor(private auth:Auths) { }

  ngOnInit() {
  }
  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario():void{
    console.log(this.formulario)
    let usuario:Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha
    )

    this.auth.SignUp(usuario)
      .then((result:any)=> {
        this.cadastroErro = true
        if(result == undefined){
          this.exibirPainelLogin()
        }
      }).catch((erro:Error)=>{
        console.log(erro);
      })
  }
  
}

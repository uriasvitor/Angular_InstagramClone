import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Auths } from '../auths.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

 @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()
 public formulario:FormGroup = new FormGroup({
   'email':new FormControl(null),
   'senha':new FormControl(null)
 })
  constructor(private auth:Auths) { }

  ngOnInit() {
  }
  
  public loginError:boolean = false;

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }
  public autenticar(){
    this.auth.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    ).then((result:any)=>{
      this.loginError = true
    })
  }

}

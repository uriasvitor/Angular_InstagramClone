import { Component, OnInit} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth/";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseApp } from "@angular/fire/compat";
import { Bd } from "../bd.service";

@Component({
    selector: "app-incluir-publicacao",
    templateUrl: "./incluir-publicacao.html",
    styleUrls:["./incluir-publicacao.css"]
})

export class IncluirPublicacao implements OnInit{
    public email:any;
    private imagem:any

    public formulario = new FormGroup({
        'titulo':new FormControl(null)
    })    

    constructor(
        public afa:AngularFireAuth,
        public storage:AngularFirestore,
        public fba:FirebaseApp,
        private bd:Bd,

    ){}
    ngOnInit():void{
        this.afa.onAuthStateChanged((user)=>{
            this.email = user?.email
        })
    }
    public publicar():void{
        this.bd.publicar({
            email: this.email,
            titulo:this.formulario.value.titulo,
            imagem:this.imagem[0]
        });
    }
    public preparaImagemUpload(event:Event):void{
        this.imagem = (<HTMLInputElement>event.target).files
      }

}
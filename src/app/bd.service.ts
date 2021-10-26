import { Injectable } from "@angular/core";
import { FirebaseApp } from "@angular/fire/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth/";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable()

export class Bd{
    constructor(
        public afdb: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public fba:FirebaseApp
    ){}

    public publicar(publicacao:any):void{

        let nomeImagem = Date.now

        this.fba.storage().ref().child(`imagens/${nomeImagem}`)
        this.afdb.database.ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo:publicacao.titulo})
    }
}
import { Usuario } from "./acesso/usuario.model";
import { AngularFireAuth } from "@angular/fire/compat/auth/";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//Adicionar Injectable para injetar o Auths ao App.module.ts
@Injectable({
    providedIn: 'root'
})
export class Auths{
    userData:any;
    token:any;
    
    constructor(
        public afs:AngularFirestore,
        public adb:AngularFireDatabase,
        public afAuth: AngularFireAuth,
        public router: Router
    ){
        this.afAuth.authState.subscribe(usuario=>{
            if(usuario){
                this.userData = usuario;
                localStorage.setItem('usuario',JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem("usuario")!);
            }else{
                localStorage.setItem('usuario',null!);
                JSON.parse(localStorage.getItem('usuario')!);
            }
        })
        
    }
    //Cadastrar Usuario
    public SignUp(usuario:Usuario):Promise<any>{
        return this.afAuth.createUserWithEmailAndPassword(usuario.email,usuario.senha)
            .then((result:any)=>{
                //Registrando dados complementares do usuario no path email na base64
                this.adb.database.ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set(usuario)
                
            })
            .catch((error:Error)=>{
                console.log(error);
            })
    }
    public autenticar(email:string,senha:string){
        return this.afAuth.signInWithEmailAndPassword(email,senha)
            .then((result:any)=>{
                this.GetToken();
            })
            .catch((error:Error)=>{
                console.log(error);
            })
    }
    public userToken: string='';
    
    //Recuperando o Token de autenticacao para Login
    GetToken():Promise<any>{
        return new Promise((resolve,reject)=>{
            this.afAuth.onAuthStateChanged(usuario =>{
                if(usuario){
                    usuario.getIdToken().then(idToken=>{
                        this.userToken = idToken;
                        localStorage.setItem('idToken', idToken);
                        this.router.navigate(['/home']);
                        return (idToken);
                    });
                }
            })
        })
    }

    public autenticado():boolean{
        if(this.userToken === '' && localStorage.getItem('idToken')!= null){
            this.userToken = localStorage.getItem('idToken')!
        }

        if(this.userToken === ''){
            this.router.navigate(['/']);
        }
        return this.userToken !== '';
    }
    public sair():void{
        this.afAuth.signOut()
            .then(()=>{
                localStorage.removeItem('idToken')
                this.userToken = '';
                this.router.navigate(['/']);
            })
        localStorage.removeItem('idToken');
    }
}
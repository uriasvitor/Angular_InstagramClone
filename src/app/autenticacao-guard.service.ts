import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Auths } from "./auths.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{
    constructor(private auth:Auths){}

    canActivate():boolean{
        console.log(this.auth.autenticado())
        return this.auth.autenticado();
    }
}
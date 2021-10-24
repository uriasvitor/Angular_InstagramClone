import { Component, OnInit} from "@angular/core";
import { Auths } from "../auths.service";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit{
    
    constructor(private auth:Auths){}
    ngOnInit():void{}
    public sair():void{
        this.auth.sair();
    }

}
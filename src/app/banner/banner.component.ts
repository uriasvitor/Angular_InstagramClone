import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Imagem } from "./imagem.model";
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    //aula 247
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      //aula 248
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido' //aula 247
  constructor() { }

 
  public imagens: Imagem[] = [
    {estado: 'visivel', url:'/assets/banner-acesso/img_1.png'},
    {estado: 'escondido', url:'/assets/banner-acesso/img_2.png'},
    {estado: 'escondido', url:'/assets/banner-acesso/img_3.png'},
    {estado: 'escondido', url:'/assets/banner-acesso/img_4.png'},
    {estado: 'escondido', url:'/assets/banner-acesso/img_5.png'},
  ] 
  ngOnInit() {
    setTimeout(()=> this.logicaRotacao(),3000)
  }

  public logicaRotacao(): void {
    //auxilia na exibição da imagem seguinte
    let idx: number = 0;
    
    //ocultar
    for(let i:number = 0; i<=4; i++) {
      if(this.imagens[i].estado === 'visivel'){
        this.imagens[i].estado = 'escondido'
        idx = i === 4 ? 0 : i + 1
        break
      }
    }
    //exibir a próxima imagem
    this.imagens[idx].estado = 'visivel'
    setTimeout(()=> this.logicaRotacao(),3000)
  }

}

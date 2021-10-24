import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
// Primeiro passo é adicionar --> { AngularFireModule }"@angular/fire/compat" 
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment.prod';
import { RouterModule} from '@angular/router';
import { Auths } from './auths.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { ROUTES } from './app.routes';
import { AutenticacaoGuard } from './autenticacao-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    RouterModule.forRoot(ROUTES),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [Auths,AutenticacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

//todos os nossos componentes serão importados aqui

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModuleModule } from './components/components-module/components-module.module';
import { FormsModalService } from './shared/forms-modal.service';
import { PesquisasService } from './services/PesquisasService';
import { DistribuicoesService } from './services/DistribuicoesService';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScreenTimeService } from './screentime.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModuleModule,
    HttpClientModule
  ],
  providers: [
    ScreenTimeService,
    FormsModalService,
    PesquisasService,
    DistribuicoesService,
    DatePipe
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

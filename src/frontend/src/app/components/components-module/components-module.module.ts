import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { CanalModalComponent } from '../canal-modal/canal-modal.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsModalComponent } from '../clients-modal/clients-modal.component';
import { CommunicationModalComponent } from '../communication-modal/communication-modal.component';
import { SucessModalComponent } from '../sucess-modal/sucess-modal.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PesquisasService } from '../../services/PesquisasService';
import { DistribuicoesService } from '../../services/DistribuicoesService';



@NgModule({
  declarations: [
    TopbarComponent,
    CanalModalComponent,
    ModalComponent,
    ClientsModalComponent,
    CommunicationModalComponent,
    SucessModalComponent,
    ErrorModalComponent,
    PesquisaComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    TopbarComponent,
    CanalModalComponent,
    ModalComponent,
    ClientsModalComponent,
    CommunicationModalComponent,
    SucessModalComponent, 
    ErrorModalComponent,
    PesquisaComponent,
    NavbarComponent
  ],
  providers:[
    PesquisasService,
    DistribuicoesService
  ]
})

export class ComponentsModuleModule { }

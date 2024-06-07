import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
//import  './topbar.component.css' as style

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  rotaAtual: string = "";
  pageName: string = "";
  distbutton: string = "";
  topbartitle: string = "";

  @Output() openModalEvent = new EventEmitter<void>();

  constructor(private router: Router) {
  }

  ngOnInit(){
    this.rotaAtual = this.router.url;
    if (this.rotaAtual === "/pesquisas") {
      this.pageName = "Pesquisas";
      this.distbutton = "dist-button-off"
      this.topbartitle = "topbar-title"

    } else {
      this.pageName = "Distribuições";
      this.distbutton = "dist-button-on"
      this.topbartitle = "topbar-title-img"
    }
  }

  openModal(){
    this.openModalEvent.emit();
  }
   
}

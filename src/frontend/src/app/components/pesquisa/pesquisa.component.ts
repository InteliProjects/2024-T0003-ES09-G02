import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {

  @Input() nomePesquisa: string = "";
  @Input() dataPesquisa: string = "";
  @Input() idPesquisa: string= "";
  @Input() quantidadePesquisa: string= "";
  @Input() ultimaPesquisa: string= "";

  dist() {
    this.router.navigate(['/distribuicoes', this.idPesquisa]);
  }

  constructor(private router: Router) {
  }
}
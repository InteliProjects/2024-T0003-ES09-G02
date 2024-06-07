import { Component } from '@angular/core';
import { ComponentsModuleModule } from '../../components/components-module/components-module.module';
import { CommonModule } from '@angular/common';
import { PesquisasService } from '../../services/PesquisasService';
import { HttpClientModule } from '@angular/common/http'; // Remova a importação do HttpClientModule
import { ScreenTimeService } from '../../screentime.service';

// Remova a importação do MetricsService

@Component({
  selector: 'app-pesquisas',
  templateUrl: './pesquisas.component.html',
  styleUrl: './pesquisas.component.css',
  standalone: true,
  imports:[ComponentsModuleModule, CommonModule, HttpClientModule]
})
export class PesquisasComponent {
  pesquisas: any = [];

  constructor(
    private pesquisasService: PesquisasService,
    private screenTimeService: ScreenTimeService // Adicione o MetricsService aos parâmetros do construtor
  ) {}

  ngOnInit(): void {
    this.screenTimeService.startLoadTimeMeasurement('pesquisas');
    this.loadResearches();
  }

  ngAfterViewInit(): void {
    this.screenTimeService.endLoadTimeMeasurement('pesquisas');
  }

  loadResearches(): void {
    this.pesquisasService.getAllResearches().subscribe(
      (data: any[]) => {
        this.pesquisas = data;
        console.log(data);
      },
      (error) => {
        console.error('Erro ao buscar pesquisas:', error);
      }
    );
  }
}

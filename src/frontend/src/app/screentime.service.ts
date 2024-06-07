import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScreenTimeService {
  private loadTimes: { [key: string]: number } = {};
  private backendUrl = 'http://localhost:9100/updateLoadTimeMetric'; // URL do backend

  constructor(private http: HttpClient) {}

  startLoadTimeMeasurement(route: string): void {
    this.loadTimes[route] = performance.now(); // Registra o tempo atual
  }

  endLoadTimeMeasurement(route: string): void {
    if (this.loadTimes[route]) {
      const loadTime = performance.now() - this.loadTimes[route]; // Calcula o tempo decorrido
      console.log("hiii" + route)
      console.log("hiii" + loadTime)
      delete this.loadTimes[route]; // Limpa o registro
      console.log(`Tempo de carregamento da tela ${route}: ${loadTime}ms`);

      // Envia o tempo de carregamento para o backend
      this.sendLoadTimeToBackend(loadTime, route).subscribe({
        next: () => console.log('Tempo de carregamento enviado com sucesso para o backend.'),
        error: (error) => console.error('Erro ao enviar tempo de carregamento para o backend:', error)
      });  
    }
  }

  private sendLoadTimeToBackend(loadTime: number, route: string) {
    return this.http.post(this.backendUrl, { loadTime, route }); // Envia o tempo de carregamento para o backend
  }
}

import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnswersService } from '../../services/Answers';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario-nps',
  templateUrl: './usuario-nps.component.html',
  styleUrl: './usuario-nps.component.css',
  standalone: true,
  imports:[CommonModule, FormsModule]
})

export class UsuarioNpsComponent {
  constructor(private activatedRoute: ActivatedRoute,
    private answersService: AnswersService, private http: HttpClient) { }

  //  POST vars
  start_Time: Date | null = null;
  finishTime: Date| null = null;;
  finished: boolean = false;
  started: boolean = false;
  answer: string = '';

  token: string = '';
  id_distribution: string = '';
  showPesquisaBox = false;
  timerActive = false;
  startTime: number = 0;
  elapsedTime: number = 0;
  notaSelecionada: number | null = null;
  respostaInput: string = '';

  startTimer() {
    this.timerActive = true;
    this.startTime = Date.now();
  }

  stopTimer() {
    this.timerActive = false;
    this.elapsedTime = Date.now() - this.startTime;
  }


  showPesquisa() {
    this.showPesquisaBox = true;
    this.started = true;
    this.startTimer();
  }

  setNota(valor: number) {
    this.notaSelecionada = valor;
  }

  sendPesquisa() {
    this.stopTimer();
    this.finished = true;
    console.log('tempo:', this.elapsedTime);
    this.sendAnswer()
  }

  sendAnswer(): void {
    this.answersService.createAnswers(this.token, this.elapsedTime, this.finished, this.started, this.respostaInput,this.id_distribution).subscribe(
      (data: any[]) => {
        console.log('data',data);
      },
      (error) => {
        console.error('Erro ao postar pesquisa:', error);
      }
    );
    this.http.post('http://localhost:9100/updateSatisfactionRateMetric', { value: this.notaSelecionada });
  }

  sendAnswerMetric(): void {
    this.answersService.updateSearchResponseTimeMetric(this.elapsedTime).subscribe(
      (data: any[]) => {
        console.log('data',data);
      },
      (error) => {
        console.error('Erro ao postar pesquisa:', error);
      }
    );
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams['token'];
    this.id_distribution = this.activatedRoute.snapshot.queryParams['id'];
  }

}

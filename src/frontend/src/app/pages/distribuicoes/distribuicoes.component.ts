import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModalService } from '../../shared/forms-modal.service';
import { DistribuicoesService } from '../../services/DistribuicoesService';
import { PesquisasService } from '../../services/PesquisasService';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ScreenTimeService } from '../../screentime.service'
import { ComponentsModuleModule } from '../../components/components-module/components-module.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-distribuicoes',
  templateUrl: './distribuicoes.component.html',
  styleUrls: ['./distribuicoes.component.css'],
  standalone: true,
  imports:[ComponentsModuleModule, CommonModule, HttpClientModule]
})
export class DistribuicoesComponent implements OnInit, AfterViewInit {
  idPesquisa: string = '';
  distribuicoes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = Math.ceil(this.distribuicoes.length / this.itemsPerPage);
  pages: (number | string)[] = [];
  nomePesquisa:string = '';
  dataPesquisa:string = "";
  numeroDistribuicoes:number = 0;
  showModal: boolean = false;
  filteredDistribuicoes: any[] = [];

  constructor(private service: FormsModalService,
              private distribuicoesService: DistribuicoesService,
              private pesquisasService: PesquisasService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private screenTimeService: ScreenTimeService) {} // Injete o serviço MetricsService

  buscarDistribuicao(nome: any) {
    nome = nome.target.value;
    this.filteredDistribuicoes = this.distribuicoes.filter(item =>
      item.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  ngOnInit() {
    this.screenTimeService.startLoadTimeMeasurement('distribuicoes'); // Registre o início do carregamento da tela
    this.idPesquisa = this.route.snapshot.paramMap.get('idPesquisa') || '';
    this.loadDistribution();
  }

  ngAfterViewInit(): void {
    this.screenTimeService.endLoadTimeMeasurement('distribuicoes'); // Registre o fim do carregamento da tela
  }

  loadDistribution(): void {
    this.distribuicoesService.getDistributionsById(this.idPesquisa).subscribe(
      (data: any[]) => {
        this.distribuicoes = data;
        this.distribuicoes = this.distribuicoes.map((item, index) => ({ key: index + 1, ...item }));
        this.filteredDistribuicoes = this.distribuicoes;
        this.numeroDistribuicoes = this.distribuicoes.length;
        this.loadResearch();
        this.updateVisibleItems();
      },
      (error) => {
        console.error('Erro ao buscar pesquisas:', error);
      }
    );
  }

  loadResearch(): void {
    this.pesquisasService.getResearchById(this.idPesquisa).subscribe(
      (data: any) => {
        this.nomePesquisa = data.name;
        this.formatData(data.creationDate)
      },
      (error) => {
        console.error('Erro ao buscar pesquisas:', error);
      }
    );
  }

  formatData(data: string): void {
    const dateObj = new Date(data);
    this.dataPesquisa = this.datePipe.transform(dateObj, 'yyyy-MM-dd') ?? '';
  }

  openModal() {
    this.showModal = true;
    this.toggleBodyScroll(false);
  }

  testeEvent(event: string){
    console.log(event);
  }

  toggleBodyScroll(enable: boolean) {
    document.body.style.overflow = enable ? 'auto' : 'hidden';
  }

  updateVisibleItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.filteredDistribuicoes = this.distribuicoes.slice(startIndex, endIndex);

    this.calculatePages();
  }

  calculatePages(): void {
    this.pages = [];
    const totalPagesToShow = 3;
    const totalVisiblePages = totalPagesToShow + 2;
  
    if (this.totalPages <= totalVisiblePages) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      if (this.currentPage <= totalPagesToShow + 1) {
        this.pages = Array.from({ length: totalVisiblePages - 1 }, (_, i) => i + 1);
        this.pages.push('...');
        this.pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - totalPagesToShow) {
        this.pages.push(1);
        this.pages.push('...');
        this.pages.push(...Array.from({ length: totalVisiblePages - 1 }, (_, i) => this.totalPages - totalVisiblePages + i + 2));
      } else {
        this.pages.push(1);
        this.pages.push('...');
        const middlePages = Array.from({ length: totalPagesToShow }, (_, i) => this.currentPage - 1 + i);
        this.pages.push(...middlePages);
        this.pages.push('...');
        this.pages.push(this.totalPages);
      }
    }
  
    if (this.currentPage > totalPagesToShow + 1) {
      this.pages.splice(1, 1, '...');
    }
    if (this.currentPage < this.totalPages - totalPagesToShow) {
      this.pages.splice(-2, 1, '...');
    }
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updateVisibleItems();
      }
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisibleItems();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleItems();
    }
  }
}

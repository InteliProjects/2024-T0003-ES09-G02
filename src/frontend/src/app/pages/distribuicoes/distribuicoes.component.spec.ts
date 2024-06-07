import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicoesComponent } from './distribuicoes.component';

describe('DistribuicoesComponent', () => {
  let component: DistribuicoesComponent;
  let fixture: ComponentFixture<DistribuicoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistribuicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

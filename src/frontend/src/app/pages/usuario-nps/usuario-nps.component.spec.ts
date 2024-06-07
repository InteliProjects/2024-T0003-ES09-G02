import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNpsComponent } from './usuario-nps.component';

describe('UsuarioNpsComponent', () => {
  let component: UsuarioNpsComponent;
  let fixture: ComponentFixture<UsuarioNpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioNpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioNpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

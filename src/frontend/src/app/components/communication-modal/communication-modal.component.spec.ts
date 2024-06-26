import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationModalComponent } from './communication-modal.component';

describe('CommunicationModalComponent', () => {
  let component: CommunicationModalComponent;
  let fixture: ComponentFixture<CommunicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

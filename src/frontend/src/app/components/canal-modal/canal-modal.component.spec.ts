import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalModalComponent } from './canal-modal.component';

describe('CanalModalComponent', () => {
  let component: CanalModalComponent;
  let fixture: ComponentFixture<CanalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

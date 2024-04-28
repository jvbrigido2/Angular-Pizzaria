import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBairrosComponent } from './ver-bairros.component';

describe('VerBairrosComponent', () => {
  let component: VerBairrosComponent;
  let fixture: ComponentFixture<VerBairrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerBairrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerBairrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

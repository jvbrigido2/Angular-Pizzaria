import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarBairroComponent } from './adicionar-bairro.component';

describe('AdicionarBairroComponent', () => {
  let component: AdicionarBairroComponent;
  let fixture: ComponentFixture<AdicionarBairroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarBairroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarBairroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

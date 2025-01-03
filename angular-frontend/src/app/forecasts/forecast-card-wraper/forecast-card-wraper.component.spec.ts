import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastCardWraperComponent } from './forecast-card-wraper.component';

describe('ForecastCardWraperComponent', () => {
  let component: ForecastCardWraperComponent;
  let fixture: ComponentFixture<ForecastCardWraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastCardWraperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForecastCardWraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

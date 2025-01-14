import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForecastComponent } from './search-forecast.component';

describe('SearchForecastComponent', () => {
  let component: SearchForecastComponent;
  let fixture: ComponentFixture<SearchForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

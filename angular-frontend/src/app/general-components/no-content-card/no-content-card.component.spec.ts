import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentCardComponent } from './no-content-card.component';

describe('NoContentCardComponent', () => {
  let component: NoContentCardComponent;
  let fixture: ComponentFixture<NoContentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoContentCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

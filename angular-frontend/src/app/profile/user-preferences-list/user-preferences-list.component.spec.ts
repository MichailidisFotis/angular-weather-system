import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferencesListComponent } from './user-preferences-list.component';

describe('UserPreferencesListComponent', () => {
  let component: UserPreferencesListComponent;
  let fixture: ComponentFixture<UserPreferencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPreferencesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPreferencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

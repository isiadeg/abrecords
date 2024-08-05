import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppActionsComponent } from './app-actions.component';

describe('AppActionsComponent', () => {
  let component: AppActionsComponent;
  let fixture: ComponentFixture<AppActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
